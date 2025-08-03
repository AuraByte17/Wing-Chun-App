// --- ELEMENTOS DOM ---
const navButtons = document.querySelectorAll('.nav-button');
const seccoes = document.querySelectorAll('.seccao');
const notificationEl = document.getElementById('notification');

// Perfil e Avatar
const perfilFormView = document.getElementById('perfil-form-view');
const perfilNomeInput = document.getElementById('perfil-nome');
const avatarSelectionGrid = document.getElementById('avatar-selection-grid');
const guardarPerfilBtn = document.getElementById('guardarPerfilBtn');
const perfilMainView = document.getElementById('perfil-main-view');
const editarPerfilBtn = document.getElementById('editarPerfilBtn');
const passaporteAvatarDisplay = document.getElementById('passaporte-avatar-display');
const passaporteNomeSpan = document.getElementById('passaporte-nome');
const passaporteTituloSpan = document.getElementById('passaporte-titulo');
const passaporteBeltSpan = document.getElementById('passaporte-belt');
const passaportePontosSpan = document.getElementById('passaporte-pontos');
const passaporteStreakSpan = document.getElementById('passaporte-streak');
const passaporteAchievementsSpan = document.getElementById('passaporte-achievements');

// Abas do Perfil
const profileTabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
const statsGrid = document.getElementById('stats-grid');
const titlesGrid = document.getElementById('titles-grid');
const xpChartCanvas = document.getElementById('xp-chart');

// Status do Utilizador
const userStatusDisplay = document.getElementById('user-status-display');
const userStatusAvatar = document.getElementById('user-status-avatar');
const userStatusName = document.getElementById('user-status-name');
const userStatusTitle = document.getElementById('user-status-title');
const userStatusBelt = document.getElementById('user-status-belt');
const userProgressBarFill = document.getElementById('user-progress-bar-fill');
const userProgressBarText = document.getElementById('user-progress-bar-text');

// Conteúdo Principal
const wcContainer = document.getElementById('seccao-treino-wc');
const conditioningContainer = document.getElementById('seccao-condicionamento');
const achievementsGrid = document.getElementById('seccao-achievements');
const beltProgressionContainer = document.getElementById('seccao-cinturoes');
const philosophyContainer = document.getElementById('seccao-filosofia');
const dailyChallengeCard = document.getElementById('seccao-daily');
const historyContainer = document.getElementById('seccao-historico');
const nutritionContainer = document.getElementById('seccao-nutricao');
const plansContainer = document.getElementById('seccao-planos');

// Modais
const videoModal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const modalVideoPlayer = document.getElementById('modal-video-player');
const closeModalBtn = videoModal.querySelector('.close-modal');
const feedbackModal = document.getElementById('feedback-modal');
const feedbackStars = feedbackModal.querySelectorAll('.star');
const saveFeedbackBtn = document.getElementById('save-feedback-btn');

let userProfile = {};
let selectedAvatar = null;
let pendingTraining = null;
let xpChart = null;

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

    // Status Bar
    userStatusDisplay.style.display = 'flex';
    userStatusAvatar.src = userProfile.avatar;
    userStatusName.textContent = userProfile.name;
    userStatusTitle.textContent = userProfile.equippedTitle || '';
    userStatusBelt.textContent = currentBelt.name;
    if (nextBelt) {
        const xpInLevel = userProfile.xp - currentBelt.minXp;
        const xpForNext = nextBelt.minXp - currentBelt.minXp;
        userProgressBarFill.style.width = `${(xpInLevel / xpForNext) * 100}%`;
        userProgressBarText.textContent = `${userProfile.xp} / ${nextBelt.minXp} XP`;
    } else {
        userProgressBarFill.style.width = '100%';
        userProgressBarText.textContent = 'Mestria Alcançada';
    }

    // Passaporte
    passaporteAvatarDisplay.src = userProfile.avatar;
    passaporteNomeSpan.textContent = userProfile.name;
    passaporteTituloSpan.textContent = userProfile.equippedTitle || 'Nenhum';
    passaporteBeltSpan.textContent = currentBelt.name;
    passaportePontosSpan.textContent = userProfile.xp;
    passaporteStreakSpan.textContent = userProfile.streak;
    const unlockedAchievements = userProfile.achievements.length;
    passaporteAchievementsSpan.textContent = `${unlockedAchievements} / ${Object.keys(ACHIEVEMENTS).length}`;

    // Renderizar conteúdo dinâmico
    renderTrainingList(WING_CHUN_TRAINING, wcContainer);
    renderTrainingList(CONDITIONING_TRAINING, conditioningContainer);
    renderBeltProgression();
    renderAchievements();
    renderDailyChallenge();
    renderHistory();
    renderStatistics();
    renderTitles();
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
        perfilMainView.style.display = 'block';
    } else {
        userProfile = {
            name: '', xp: 0, avatar: AVATARS[0], achievements: [], streak: 0, daily: {}, history: [],
            titles: [], equippedTitle: '',
            stats: { trainingsCompleted: 0, readPhilosophy: 0, xpByDay: {} }
        };
        perfilFormView.style.display = 'block';
        perfilMainView.style.display = 'none';
    }
    checkDailyChallenge();
    updateUI();
}

function showNotification(text, type = 'normal') {
    notificationEl.textContent = text;
    notificationEl.style.animation = '';
    if (type === 'achievement') {
        notificationEl.textContent = `🏆 ${text}`;
        void notificationEl.offsetWidth;
        notificationEl.style.animation = 'pulse 1.5s ease-out';
    }
    notificationEl.style.display = 'block';
    setTimeout(() => { notificationEl.style.display = 'none'; }, 3000);
}

function checkAchievements(completedTraining = false) {
    const now = new Date();
    Object.keys(ACHIEVEMENTS).forEach(key => {
        if (!userProfile.achievements.includes(key)) {
            const achievement = ACHIEVEMENTS[key];
            let conditionMet = false;
            if (key === 'NIGHT_OWL' && completedTraining) {
                conditionMet = achievement.check(userProfile, now);
            } else if (key !== 'NIGHT_OWL') {
                conditionMet = achievement.check(userProfile);
            }

            if (conditionMet) {
                userProfile.achievements.push(key);
                showNotification(`Conquista: ${achievement.title}`, 'achievement');
                checkTitleUnlocks();
            }
        }
    });
}

function checkTitleUnlocks() {
    Object.keys(PROFILE_TITLES).forEach(titleKey => {
        const title = PROFILE_TITLES[titleKey];
        if (userProfile.achievements.includes(title.achievementId) && !userProfile.titles.includes(titleKey)) {
            userProfile.titles.push(titleKey);
            showNotification(`Título Desbloqueado: ${title.title}`);
        }
    });
}

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

    // Estatísticas
    userProfile.stats.trainingsCompleted = (userProfile.stats.trainingsCompleted || 0) + 1;
    const today = new Date().toISOString().split('T')[0];
    userProfile.stats.xpByDay[today] = (userProfile.stats.xpByDay[today] || 0) + xpToAdd;

    showNotification(`+${xpToAdd} XP!`);
    if (newBelt.level > oldBelt.level) {
        setTimeout(() => showNotification(`Promovido a ${newBelt.name}!`, 'achievement'), 3100);
    }
    checkAchievements(true);
    saveProfile();
    pendingTraining = null;
}

function openVideoModal(title, videoPath) {
    modalTitle.textContent = title;
    modalVideoPlayer.src = videoPath;
    videoModal.style.display = 'flex';
    modalVideoPlayer.play();
}

function closeAllModals() {
    videoModal.style.display = 'none';
    modalVideoPlayer.pause();
    modalVideoPlayer.src = '';
    feedbackModal.style.display = 'none';
}

function openFeedbackModal() {
    feedbackModal.style.display = 'flex';
    feedbackStars.forEach(s => s.classList.remove('rated'));
    saveFeedbackBtn.disabled = true;
}

function renderTrainingList(data, container) {
    let html = '';
    for (const category in data) {
        html += `<h2 class="subtitulo-seccao">${category}</h2><div class="lista-treinos">`;
        data[category].forEach(item => {
            const videoPlaceholderUrl = `https://placehold.co/300x150/1a1a1a/555555?text=${encodeURIComponent(item.title)}`;
            html += `
                <div class="item-treino">
                    <div class="item-treino-video" data-title="${item.title}" data-path="${item.videoPath}">
                        <img src="${videoPlaceholderUrl}" alt="Thumbnail para ${item.title}">
                    </div>
                    <h3 class="item-treino-titulo">${item.title}</h3>
                    <p class="item-treino-descricao">${item.description}</p>
                    <div class="item-treino-info">
                        <span class="item-treino-xp">+${item.xp} XP</span>
                        <button class="action-button complete-training-btn" data-id="${item.id}" data-xp="${item.xp}">Completar</button>
                    </div>
                </div>`;
        });
        html += `</div>`;
    }
    container.innerHTML = `<h1 class="titulo-seccao">${container.id.replace('seccao-', '')}</h1>${html}`;
}

function renderBeltProgression() { /* ... (sem alterações, apenas o container) ... */ }
function renderHistory() { /* ... (sem alterações, apenas o container) ... */ }

function renderAchievements() {
    let html = '<h1 class="titulo-seccao">Conquistas</h1><div id="achievements-grid">';
    Object.keys(ACHIEVEMENTS).forEach(key => {
        const ach = ACHIEVEMENTS[key];
        const isUnlocked = userProfile.achievements.includes(key);
        if (!ach.secret || isUnlocked) {
            html += `
                <div class="achievement-badge ${isUnlocked ? 'unlocked' : ''} ${ach.secret ? 'secret' : ''}">
                    <div class="icon">${ach.icon}</div>
                    <h4>${isUnlocked ? ach.title : '?? Conquista Secreta ??'}</h4>
                    <p>${isUnlocked ? ach.desc : 'Continua a treinar para desbloquear.'}</p>
                </div>`;
        }
    });
    html += '</div>';
    achievementsGrid.innerHTML = html;
}

function renderPhilosophy() {
    let html = '<h1 class="titulo-seccao">Filosofia</h1>';
    PHILOSOPHY_CONTENT.forEach(entry => {
        html += `<div class="philosophy-entry"><h3>${entry.title}</h3><p>${entry.text}</p></div>`;
    });
    philosophyContainer.innerHTML = html;
}

function renderDailyChallenge() { /* ... (sem alterações, apenas o container) ... */ }

function renderAvatarSelection() {
    avatarSelectionGrid.innerHTML = '';
    AVATARS.forEach(avatarSrc => {
        const img = document.createElement('img');
        img.src = avatarSrc;
        img.className = 'avatar-option';
        img.addEventListener('click', () => {
            selectedAvatar = avatarSrc;
            document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
            img.classList.add('selected');
        });
        avatarSelectionGrid.appendChild(img);
    });
}

// Novas Funções de Renderização
function renderNutrition() {
    let html = '<h1 class="titulo-seccao">Nutrição</h1>';
    NUTRITION_CONTENT.forEach(entry => {
        html += `<div class="nutrition-entry"><h3>${entry.title}</h3>${entry.content}</div>`;
    });
    nutritionContainer.innerHTML = html;
}

function renderTrainingPlans() {
    let html = '<h1 class="titulo-seccao">Planos de Treino</h1><div id="container-planos">';
    TRAINING_PLANS.forEach(plan => {
        html += `
            <div class="plan-card">
                <h3>${plan.title}</h3>
                <p class="plan-description">${plan.description}</p>`;
        for (const day in plan.schedule) {
            html += `<div class="plan-week-day"><strong>${day}:</strong> ${plan.schedule[day]}</div>`;
        }
        html += `</div>`;
    });
    html += '</div>';
    plansContainer.innerHTML = html;
}

function renderStatistics() {
    const stats = userProfile.stats;
    statsGrid.innerHTML = `
        <div class="stat-card"><div class="value">${stats.trainingsCompleted || 0}</div><div class="label">Treinos Completos</div></div>
        <div class="stat-card"><div class="value">${userProfile.streak || 0}</div><div class="label">Sequência Atual</div></div>
        <div class="stat-card"><div class="value">${userProfile.history.length}</div><div class="label">Sessões com Feedback</div></div>
    `;

    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateString = d.toISOString().split('T')[0];
        labels.push(d.toLocaleDateString('pt-PT', { weekday: 'short' }));
        data.push(stats.xpByDay[dateString] || 0);
    }

    if (xpChart) xpChart.destroy();
    xpChart = new Chart(xpChartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'XP Ganho',
                data: data,
                borderColor: 'rgba(230, 126, 34, 1)',
                backgroundColor: 'rgba(230, 126, 34, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderTitles() {
    titlesGrid.innerHTML = '';
    Object.keys(PROFILE_TITLES).forEach(key => {
        const title = PROFILE_TITLES[key];
        const isUnlocked = userProfile.titles.includes(key);
        const isEquipped = userProfile.equippedTitle === title.title;
        const card = document.createElement('div');
        card.className = `title-card ${isUnlocked ? 'unlocked' : 'locked'} ${isEquipped ? 'equipped' : ''}`;
        card.innerHTML = `<h4>${title.title}</h4><p>${isUnlocked ? 'Clica para equipar' : `Desbloqueado com a conquista: ${ACHIEVEMENTS[title.achievementId].title}`}</p>`;
        if (isUnlocked) {
            card.addEventListener('click', () => {
                userProfile.equippedTitle = isEquipped ? '' : title.title;
                saveProfile();
            });
        }
        titlesGrid.appendChild(card);
    });
}


// --- EVENT LISTENERS E INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // Navegação
    navButtons.forEach(button => button.addEventListener('click', () => mostrarSeccao(button.dataset.seccao)));
    
    // Abas do Perfil
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            profileTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            if(tab.dataset.tab === 'tab-estatisticas') renderStatistics(); // Re-render chart
        });
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
            perfilMainView.style.display = 'block';
        } else {
            showNotification("Por favor, insere o nome e seleciona um avatar.");
        }
    });

    editarPerfilBtn.addEventListener('click', () => {
        perfilNomeInput.value = userProfile.name;
        selectedAvatar = userProfile.avatar;
        renderAvatarSelection();
        const currentAvatarEl = Array.from(avatarSelectionGrid.children).find(img => img.src === userProfile.avatar);
        if (currentAvatarEl) currentAvatarEl.classList.add('selected');
        perfilFormView.style.display = 'block';
        perfilMainView.style.display = 'none';
    });

    // Event Delegation para botões de treino
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.complete-training-btn')) {
            completeTraining(e.target.dataset.id, parseInt(e.target.dataset.xp));
        }
        if (e.target.closest('.item-treino-video')) {
            const videoDiv = e.target.closest('.item-treino-video');
            openVideoModal(videoDiv.dataset.title, videoDiv.dataset.path);
        }
    });

    // Modais
    closeModalBtn.addEventListener('click', closeAllModals);
    feedbackModal.querySelector('.close-modal').addEventListener('click', closeAllModals);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });

    // Feedback Modal
    let currentRating = 0;
    feedbackStars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = star.dataset.value;
            saveFeedbackBtn.disabled = false;
            feedbackStars.forEach((s, i) => s.classList.toggle('rated', i < currentRating));
        });
    });
    saveFeedbackBtn.addEventListener('click', () => {
        if (currentRating > 0 && pendingTraining) {
            userProfile.history.push({
                trainingId: pendingTraining.trainingId, xpGained: pendingTraining.xpToAdd,
                rating: parseInt(currentRating), date: new Date().toISOString()
            });
            finalizeTrainingCompletion();
            closeAllModals();
            currentRating = 0;
        }
    });
    
    // Inicialização da App
    renderAvatarSelection();
    renderPhilosophy();
    renderNutrition();
    renderTrainingPlans();
    loadProfile();
});
