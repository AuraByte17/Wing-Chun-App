// --- ELEMENTOS DOM ---
const navButtons = document.querySelectorAll('.nav-button');
const seccoes = document.querySelectorAll('.seccao');
const notificationEl = document.getElementById('notification');

// Perfil e Avatar
const perfilFormView = document.getElementById('perfil-form-view');
const perfilNomeInput = document.getElementById('perfil-nome');
const avatarSelectionGrid = document.getElementById('avatar-selection-grid');
const guardarPerfilBtn = document.getElementById('guardarPerfilBtn');
const perfilPassaporteView = document.getElementById('perfil-passaporte-view');
const editarPerfilBtn = document.getElementById('editarPerfilBtn');
const passaporteAvatarDisplay = document.getElementById('passaporte-avatar-display');
const passaporteNomeSpan = document.getElementById('passaporte-nome');
const passaporteBeltSpan = document.getElementById('passaporte-belt');
const passaportePontosSpan = document.getElementById('passaporte-pontos');
const passaporteStreakSpan = document.getElementById('passaporte-streak');
const passaporteAchievementsSpan = document.getElementById('passaporte-achievements');

// Status do Utilizador
const userStatusDisplay = document.getElementById('user-status-display');
const userStatusAvatar = document.getElementById('user-status-avatar');
const userStatusName = document.getElementById('user-status-name');
const userStatusBelt = document.getElementById('user-status-belt');
const userProgressBarFill = document.getElementById('user-progress-bar-fill');
const userProgressBarText = document.getElementById('user-progress-bar-text');

// Conteúdo Principal
const wcContainer = document.getElementById('container-treinos-wc');
const conditioningContainer = document.getElementById('container-treinos-condicionamento');
const achievementsGrid = document.getElementById('achievements-grid');
const beltProgressionContainer = document.getElementById('belt-progression-container');
const philosophyContainer = document.getElementById('container-filosofia');
const dailyChallengeCard = document.getElementById('daily-challenge-card');
const historyContainer = document.getElementById('container-historico'); // Novo: Histórico

// Pesquisa
const searchWcInput = document.getElementById('search-treino-wc');
const searchConditioningInput = document.getElementById('search-condicionamento');

// Modais
const videoModal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const modalVideoContainer = document.getElementById('modal-video-container');
const closeModalBtn = document.querySelector('.close-modal');
const feedbackModal = document.getElementById('feedback-modal'); // Novo: Feedback
const feedbackStars = feedbackModal.querySelectorAll('.star'); // Novo: Feedback
const saveFeedbackBtn = document.getElementById('save-feedback-btn'); // Novo: Feedback


let userProfile = {};
let selectedAvatar = null; // Novo: para guardar o avatar selecionado no formulário
let pendingTraining = null; // Novo: para guardar o treino à espera de feedback

// --- FUNÇÕES ---

function mostrarSeccao(idSeccao) {
    seccoes.forEach(seccao => seccao.classList.remove('visivel'));
    const seccaoAtiva = document.getElementById(idSeccao);
    if (seccaoAtiva) seccaoAtiva.classList.add('visivel');
    navButtons.forEach(button => button.classList.toggle('active', button.dataset.seccao === idSeccao));
}

function getUserBelt(xp) {
    return BELT_SYSTEM.slice().reverse().find(belt => xp >= belt.minXp) || BELT_SYSTEM[0];
}

function applyBeltTheme(belt) {
    const root = document.documentElement.style;
    root.setProperty('--primary-color', belt.color);
    root.setProperty('--secondary-color', belt.secondaryColor);
}

function updateUI() {
    if (!userProfile.name) {
        userStatusDisplay.style.display = 'none';
        return;
    }

    const currentBelt = getUserBelt(userProfile.xp);
    const nextBelt = BELT_SYSTEM[currentBelt.level + 1];

    applyBeltTheme(currentBelt);

    // Atualizar Status Bar
    userStatusDisplay.style.display = 'flex';
    userStatusAvatar.src = userProfile.avatar || AVATARS[0];
    userStatusName.textContent = userProfile.name;
    userStatusBelt.textContent = currentBelt.name;

    if (nextBelt) {
        const xpInCurrentLevel = userProfile.xp - currentBelt.minXp;
        const xpForNextLevel = nextBelt.minXp - currentBelt.minXp;
        const progressPercentage = (xpInCurrentLevel / xpForNextLevel) * 100;
        userProgressBarFill.style.width = `${progressPercentage}%`;
        userProgressBarText.textContent = `${userProfile.xp} / ${nextBelt.minXp} XP`;
    } else {
        userProgressBarFill.style.width = '100%';
        userProgressBarText.textContent = 'Mestria Alcançada';
    }

    // Atualizar Passaporte do Perfil
    passaporteAvatarDisplay.src = userProfile.avatar || AVATARS[0];
    passaporteNomeSpan.textContent = userProfile.name;
    passaporteBeltSpan.textContent = currentBelt.name;
    passaportePontosSpan.textContent = userProfile.xp;
    passaporteStreakSpan.textContent = userProfile.streak;
    passaporteAchievementsSpan.textContent = `${userProfile.achievements.length} / ${Object.keys(ACHIEVEMENTS).length}`;

    // Renderizar conteúdo dinâmico
    const unlockedItems = ALL_TRAINING_ITEMS.filter(item => item.requiredBelt <= currentBelt.level);
    renderTrainingList(WING_CHUN_TRAINING, wcContainer, unlockedItems, searchWcInput.value);
    renderTrainingList(CONDITIONING_TRAINING, conditioningContainer, unlockedItems, searchConditioningInput.value);
    renderBeltProgression();
    renderAchievements();
    renderDailyChallenge();
    renderHistory();
}

function saveProfile() {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
    updateUI();
}

function loadProfile() {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        perfilFormView.style.display = 'none';
        perfilPassaporteView.style.display = 'block';
    } else {
        // Inicializar perfil com valores padrão
        userProfile = {
            name: '',
            xp: 0,
            avatar: AVATARS[0],
            achievements: [],
            streak: 0,
            daily: {},
            history: [] // Novo: histórico de treino
        };
        perfilFormView.style.display = 'block';
        perfilPassaporteView.style.display = 'none';
    }
    checkDailyChallenge();
    updateUI();
}

function showNotification(text, type = 'normal') {
    notificationEl.textContent = text;
    notificationEl.style.animation = ''; // Reset animation
    if(type === 'achievement') {
        notificationEl.textContent = `🏆 ${text}`;
        // Forçar reflow para reiniciar a animação
        void notificationEl.offsetWidth; 
        notificationEl.style.animation = 'pulse 1.5s ease-out';
    }
    notificationEl.style.display = 'block';
    setTimeout(() => {
        notificationEl.style.display = 'none';
    }, 3000);
}

function checkAchievements() {
    Object.keys(ACHIEVEMENTS).forEach(key => {
        if (!userProfile.achievements.includes(key)) {
            if (ACHIEVEMENTS[key].check(userProfile)) {
                userProfile.achievements.push(key);
                showNotification(`Conquista: ${ACHIEVEMENTS[key].title}`, 'achievement');
            }
        }
    });
}

// Função modificada para abrir modal de feedback
function completeTraining(trainingId, xpToAdd) {
    pendingTraining = { trainingId, xpToAdd };
    openFeedbackModal();
}

function finalizeTrainingCompletion() {
    if (!pendingTraining) return;

    const { xpToAdd } = pendingTraining;
    const oldBelt = getUserBelt(userProfile.xp);
    userProfile.xp += xpToAdd;
    const newBelt = getUserBelt(userProfile.xp);

    showNotification(`+${xpToAdd} XP!`);

    if (newBelt.level > oldBelt.level) {
        setTimeout(() => {
            showNotification(`Promovido a ${newBelt.name}!`, 'achievement');
        }, 3100);
    }

    checkAchievements();
    saveProfile();
    pendingTraining = null;
}

function openVideoModal(title, videoId) {
    modalTitle.textContent = title;
    // Alterado para incorporar vídeo do YouTube
    modalVideoContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>`;
    videoModal.style.display = 'flex';
}

function closeAllModals() {
    videoModal.style.display = 'none';
    feedbackModal.style.display = 'none';
    modalVideoContainer.innerHTML = ''; // Limpa o vídeo para parar a reprodução
}

// Nova função para abrir o modal de feedback
function openFeedbackModal() {
    feedbackModal.style.display = 'flex';
    // Resetar estrelas e botão
    feedbackStars.forEach(s => s.classList.remove('rated'));
    saveFeedbackBtn.disabled = true;
}

// Função de renderização modificada para incluir pesquisa e acessibilidade
function renderTrainingList(data, container, unlockedItems, searchTerm = '') {
    container.innerHTML = '';
    let itemsRendered = 0;
    const term = searchTerm.toLowerCase().trim();

    for (const category in data) {
        const categoryItems = data[category]
            .filter(item => unlockedItems.some(unlocked => unlocked.id === item.id))
            .filter(item => item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term));

        if (categoryItems.length === 0) continue;
        itemsRendered += categoryItems.length;

        const categoryEl = document.createElement('div');
        categoryEl.className = 'training-category';
        categoryEl.innerHTML = `<h2 class="subtitulo-seccao">${category}</h2>`;

        const listEl = document.createElement('div');
        listEl.className = 'lista-treinos';

        categoryItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item-treino';
            const videoPlaceholderUrl = `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`;

            itemEl.innerHTML = `
                <div class="item-treino-video" role="button" tabindex="0" aria-label="Ver vídeo de ${item.title}">
                    <img src="${videoPlaceholderUrl}" alt="Thumbnail para ${item.title}">
                </div>
                <h3 class="item-treino-titulo">${item.title}</h3>
                <p class="item-treino-descricao">${item.description}</p>
                <div class="item-treino-info">
                    <span class="item-treino-xp">+${item.xp} XP</span>
                    <button class="action-button complete-training-btn" aria-label="Completar treino de ${item.title}">Completar</button>
                </div>
            `;
            
            const completeBtn = itemEl.querySelector('.complete-training-btn');
            const videoThumb = itemEl.querySelector('.item-treino-video');

            completeBtn.addEventListener('click', () => {
                completeTraining(item.id, item.xp);
            });
            
            videoThumb.addEventListener('click', () => {
                openVideoModal(item.title, item.videoId);
            });
            // Acessibilidade: Ativar com teclado
            videoThumb.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    openVideoModal(item.title, item.videoId);
                }
            });


            listEl.appendChild(itemEl);
        });

        categoryEl.appendChild(listEl);
        container.appendChild(categoryEl);
    }
    if (itemsRendered === 0) {
        container.innerHTML = `<p>Nenhum treino encontrado. Tenta um termo de pesquisa diferente ou avança de cinturão para desbloquear mais!</p>`;
    }
}

function renderBeltProgression() {
    beltProgressionContainer.innerHTML = '';
    BELT_SYSTEM.forEach(belt => {
        const isUnlocked = userProfile.xp >= belt.minXp;
        const card = document.createElement('div');
        card.className = `belt-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        if (isUnlocked) {
            card.style.borderColor = belt.color;
        }

        let requirementHTML = isUnlocked 
            ? `<span class="belt-requirement" style="color: ${belt.color};">DESBLOQUEADO</span>`
            : `<span class="belt-requirement">Requer ${belt.minXp} XP</span>`;

        let contentHTML = '';
        const itemsInBelt = ALL_TRAINING_ITEMS.filter(item => item.requiredBelt === belt.level);
        if (itemsInBelt.length > 0) {
            contentHTML += `<div class="belt-content-title">Conteúdo Desbloqueado:</div><div class="belt-content-grid">`;
            itemsInBelt.forEach(item => {
                contentHTML += `<div class="belt-item"><span class="title">${item.title}</span><span class="xp"> (+${item.xp} XP)</span></div>`;
            });
            contentHTML += `</div>`;
        }

        card.innerHTML = `
            <div class="belt-header">
                <h3 style="color: ${belt.color};">${belt.name}</h3>
                ${requirementHTML}
            </div>
            ${contentHTML}
        `;
        beltProgressionContainer.appendChild(card);
    });
}

function renderAchievements() {
    achievementsGrid.innerHTML = '';
    Object.keys(ACHIEVEMENTS).forEach(key => {
        const ach = ACHIEVEMENTS[key];
        const isUnlocked = userProfile.achievements.includes(key);
        const badgeEl = document.createElement('div');
        badgeEl.className = `achievement-badge ${isUnlocked ? 'unlocked' : ''}`;
        badgeEl.innerHTML = `
            <div class="icon">${ach.icon}</div>
            <h4>${ach.title}</h4>
            <p>${ach.desc}</p>
        `;
        achievementsGrid.appendChild(badgeEl);
    });
}

function renderPhilosophy() {
    philosophyContainer.innerHTML = '';
    PHILOSOPHY_CONTENT.forEach(entry => {
        const entryEl = document.createElement('div');
        entryEl.className = 'philosophy-entry';
        entryEl.innerHTML = `
            <h3>${entry.title}</h3>
            <p>${entry.text}</p>
        `;
        philosophyContainer.appendChild(entryEl);
    });
}

function checkDailyChallenge() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = userProfile.daily?.date;

    if (today !== lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate === yesterday.toISOString().split('T')[0] && userProfile.daily.completed) {
            // Streak continua
        } else if (lastDate !== today) {
            userProfile.streak = 0;
        }

        const availableChallenges = ALL_TRAINING_ITEMS.filter(item => item.requiredBelt <= getUserBelt(userProfile.xp).level);
        const randomChallenge = availableChallenges.length > 0 ? availableChallenges[Math.floor(Math.random() * availableChallenges.length)] : null;

        userProfile.daily = {
            date: today,
            challenge: randomChallenge,
            completed: false
        };
        saveProfile();
    }
}

function renderDailyChallenge() {
    if (!userProfile.daily || !userProfile.daily.challenge) {
        dailyChallengeCard.innerHTML = `<p>Nenhum desafio disponível. Aumenta de nível para desbloquear mais treinos!</p>`;
        return;
    }
    const { challenge, completed } = userProfile.daily;
    const bonusXp = 50;
    dailyChallengeCard.innerHTML = `
        <div class="streak-counter">🔥 ${userProfile.streak} Dias de Sequência</div>
        <h3>${challenge.title}</h3>
        <p>${challenge.description}</p>
        <button id="complete-daily-btn" class="action-button perfil-action-button" ${completed ? 'disabled' : ''}>
            ${completed ? 'Concluído!' : `Completar por +${bonusXp} XP`}
        </button>
    `;

    if (!completed) {
        document.getElementById('complete-daily-btn').addEventListener('click', () => {
            userProfile.daily.completed = true;
            userProfile.streak = (userProfile.streak || 0) + 1;
            completeTraining(challenge.id, bonusXp);
        });
    }
}

// Nova função para renderizar avatares
function renderAvatarSelection() {
    avatarSelectionGrid.innerHTML = '';
    AVATARS.forEach(avatarSrc => {
        const img = document.createElement('img');
        img.src = avatarSrc;
        img.alt = 'Opção de avatar';
        img.className = 'avatar-option';
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');

        img.addEventListener('click', () => {
            selectedAvatar = avatarSrc;
            document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
            img.classList.add('selected');
        });
        
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                img.click();
            }
        });

        avatarSelectionGrid.appendChild(img);
    });
}

// Nova função para renderizar o histórico
function renderHistory() {
    if (!userProfile.history || userProfile.history.length === 0) {
        historyContainer.innerHTML = `<p>Ainda não completaste nenhum treino. Vai treinar!</p>`;
        return;
    }

    historyContainer.innerHTML = '';
    // Mostra os treinos mais recentes primeiro
    userProfile.history.slice().reverse().forEach(entry => {
        const trainingItem = ALL_TRAINING_ITEMS.find(t => t.id === entry.trainingId);
        if (!trainingItem) return;

        const entryEl = document.createElement('div');
        entryEl.className = 'history-item';
        
        const date = new Date(entry.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' });
        const stars = '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating);

        entryEl.innerHTML = `
            <div class="history-item-info">
                <div class="title">${trainingItem.title}</div>
                <div class="date">${date}</div>
            </div>
            <div class="history-item-feedback">
                <span class="stars" aria-label="Classificação: ${entry.rating} de 5 estrelas">${stars}</span>
                <span class="xp" aria-label="${entry.xpGained} pontos de experiência ganhos">(+${entry.xpGained} XP)</span>
            </div>
        `;
        historyContainer.appendChild(entryEl);
    });
}


// --- EVENT LISTENERS E INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // Navegação
    navButtons.forEach(button => {
        button.addEventListener('click', () => mostrarSeccao(button.dataset.seccao));
    });

    // Gestão de Perfil
    guardarPerfilBtn.addEventListener('click', () => {
        const name = perfilNomeInput.value.trim();
        if (name && selectedAvatar) {
            userProfile.name = name;
            userProfile.avatar = selectedAvatar;
            checkAchievements();
            saveProfile();
            perfilFormView.style.display = 'none';
            perfilPassaporteView.style.display = 'block';
        } else if (!name) {
            showNotification("Por favor, insere o teu nome.");
        } else if (!selectedAvatar) {
            showNotification("Por favor, seleciona um avatar.");
        }
    });

    editarPerfilBtn.addEventListener('click', () => {
        perfilNomeInput.value = userProfile.name;
        selectedAvatar = userProfile.avatar;
        renderAvatarSelection(); // Renderiza os avatares novamente
        // Marca o avatar atual como selecionado
        const currentAvatarEl = Array.from(avatarSelectionGrid.children).find(img => img.src === userProfile.avatar);
        if (currentAvatarEl) currentAvatarEl.classList.add('selected');

        perfilFormView.style.display = 'block';
        perfilPassaporteView.style.display = 'none';
    });

    // Pesquisa
    searchWcInput.addEventListener('input', () => updateUI());
    searchConditioningInput.addEventListener('input', () => updateUI());

    // Modais
    closeModalBtn.addEventListener('click', closeAllModals);
    closeModalBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') closeAllModals();
    });
    window.addEventListener('click', (event) => {
        if (event.target == videoModal || event.target == feedbackModal) {
            closeAllModals();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });

    // Feedback Modal
    let currentRating = 0;
    feedbackStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            feedbackStars.forEach(s => s.classList.remove('rated'));
            for (let i = 0; i < star.dataset.value; i++) {
                feedbackStars[i].classList.add('rated');
            }
        });
        star.addEventListener('mouseout', () => {
            feedbackStars.forEach(s => s.classList.remove('rated'));
            if (currentRating > 0) {
                 for (let i = 0; i < currentRating; i++) {
                    feedbackStars[i].classList.add('rated');
                }
            }
        });
        star.addEventListener('click', () => {
            currentRating = star.dataset.value;
            saveFeedbackBtn.disabled = false;
        });
    });

    saveFeedbackBtn.addEventListener('click', () => {
        if (currentRating > 0 && pendingTraining) {
            userProfile.history.push({
                trainingId: pendingTraining.trainingId,
                xpGained: pendingTraining.xpToAdd,
                rating: parseInt(currentRating),
                date: new Date().toISOString()
            });
            finalizeTrainingCompletion();
            closeAllModals();
            currentRating = 0; // Reset rating
        }
    });
    
    // Inicialização da App
    renderAvatarSelection();
    renderPhilosophy();
    loadProfile();
});
