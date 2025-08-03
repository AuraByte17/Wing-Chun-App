// --- DADOS ---

const AVATARS = [
    'https://placehold.co/150x150/2c3e50/ecf0f1?text=A1', 'https://placehold.co/150x150/c0392b/ecf0f1?text=A2',
    'https://placehold.co/150x150/27ae60/ecf0f1?text=A3', 'https://placehold.co/150x150/8e44ad/ecf0f1?text=A4',
    'https://placehold.co/150x150/f39c12/ecf0f1?text=A5', 'https://placehold.co/150x150/2980b9/ecf0f1?text=A6',
];

const BELT_SYSTEM = [
    { level: 0, name: "Cinturão Branco", minXp: 0, color: "#ecf0f1", secondaryColor: "#bdc3c7" },
    { level: 1, name: "Cinturão Amarelo", minXp: 250, color: "#f1c40f", secondaryColor: "#f39c12" },
    { level: 2, name: "Cinturão Laranja", minXp: 700, color: "#e67e22", secondaryColor: "#d35400" },
    { level: 3, name: "Cinturão Vermelho", minXp: 1500, color: "#e74c3c", secondaryColor: "#c0392b" },
    { level: 4, name: "Cinturão Verde", minXp: 2500, color: "#2ecc71", secondaryColor: "#27ae60" },
    { level: 5, name: "Cinturão Castanho", minXp: 4000, color: "#a1662f", secondaryColor: "#6d4c41" },
    { level: 6, name: "Cinturão Preto", minXp: 6000, color: "#2c3e50", secondaryColor: "#000000" },
    { level: 7, name: "Cinturão Preto I", minXp: 8500, color: "#000000", secondaryColor: "#34495e" },
    { level: 8, name: "Cinturão Preto II", minXp: 12000, color: "#000000", secondaryColor: "#e74c3c" },
];

// Revertido para videoPath local
const WING_CHUN_TRAINING = {
    "Fundamentos (Nível Branco)": [
        { id: "wc1", title: "Yee Jee Kim Yeung Ma", description: "A postura base de treino.", xp: 5, requiredBelt: 0, videoPath: "videos/Yee_Jee_Kim_Yeung_Ma.mp4" },
        { id: "wc3", title: "Soco Direto (Yat Chi Kuen)", description: "O soco em cadeia vertical.", xp: 5, requiredBelt: 0, videoPath: "videos/Soco_Direto.mp4" },
        { id: "wc4", title: "Cavalo que Avança (Seung Ma)", description: "Treino de avanço mantendo a estrutura.", xp: 10, requiredBelt: 0, videoPath: "videos/Seung_Ma.mp4" },
    ],
    "Currículo (Nível Amarelo)": [
        { id: "wc5", title: "A Pequena Ideia (Siu Nim Tao)", description: "A primeira forma, base de todo o sistema.", xp: 50, requiredBelt: 1, videoPath: "videos/Siu_Nim_Tao.mp4" },
        { id: "wc13", title: "Mãos Coladas (Dan Chi Sao)", description: "Praticar a troca e combinações.", xp: 40, requiredBelt: 1, videoPath: "videos/Dan_Chi_Sao.mp4" },
    ],
};

// Adicionados novos exercícios de condicionamento
const CONDITIONING_TRAINING = {
    "Introdução ao Condicionamento": [
        { id: "c1", title: "Flexões", description: "Desenvolve a força do tronco e braços.", xp: 10, requiredBelt: 0, videoPath: "videos/Flexoes.mp4" },
        { id: "c2", title: "Agachamentos", description: "Desenvolve a força das pernas.", xp: 10, requiredBelt: 0, videoPath: "videos/Agachamentos.mp4" },
        { id: "c3", title: "Prancha", description: "Fortalece o core para manter a estrutura.", xp: 10, requiredBelt: 0, videoPath: "videos/Prancha.mp4" },
        { id: "c7", title: "Burpees", description: "Exercício de corpo inteiro para resistência.", xp: 15, requiredBelt: 0, videoPath: "videos/Burpees.mp4" },
        { id: "c8", title: "Lunges", description: "Fortalece pernas e glúteos, melhora o equilíbrio.", xp: 10, requiredBelt: 0, videoPath: "videos/Lunges.mp4" },
        { id: "c9", title: "Saltar à Corda", description: "Excelente para cardio e coordenação.", xp: 15, requiredBelt: 1, videoPath: "videos/Corda.mp4" },
    ],
};

// Novo: Conteúdo de Nutrição
const NUTRITION_CONTENT = [
    {
        title: "Hidratação: O Pilar Esquecido",
        content: "<p>A água é crucial para o desempenho. A desidratação, mesmo que ligeira, pode diminuir a força, a velocidade e o foco. Beba água consistentemente ao longo do dia, não apenas quando sente sede.</p><ul><li>Beba 2-3 litros de água por dia, mais em dias de treino intenso.</li><li>Considere bebidas eletrolíticas após treinos longos e suados.</li></ul>"
    },
    {
        title: "Snacks Pré e Pós-Treino",
        content: "<p>O que come antes e depois do treino pode fazer uma grande diferença na sua energia e recuperação.</p><p><strong>Pré-Treino (30-60 mins antes):</strong> Foque-se em hidratos de carbono de digestão rápida para energia.</p><ul><li>Banana</li><li>Maçã</li><li>Uma pequena taça de aveia</li></ul><p><strong>Pós-Treino (até 60 mins depois):</strong> Combine proteína para reparação muscular e hidratos de carbono para repor a energia.</p><ul><li>Batido de proteína com uma peça de fruta</li><li>Iogurte grego com frutos vermelhos</li><li>Frango grelhado com batata doce</li></ul>"
    }
];

// Novo: Planos de Treino
const TRAINING_PLANS = [
    {
        id: "plan1",
        title: "Semana do Fundamento",
        description: "Um plano para iniciantes focado em estabelecer uma base sólida de Wing Chun.",
        schedule: {
            "Segunda": "Yee Jee Kim Yeung Ma (15 min) + Soco Direto (100x)",
            "Terça": "Flexões (3 séries) + Prancha (3x 45s)",
            "Quarta": "Seung Ma (15 min) + Agachamentos (3 séries)",
            "Quinta": "Descanso Ativo (Alongamentos)",
            "Sexta": "Repetir Siu Nim Tao (10x) + Soco Direto (200x)",
            "Sábado": "Burpees (5x 10) + Lunges (3x 12 por perna)",
            "Domingo": "Descanso",
        }
    },
    {
        id: "plan2",
        title: "Semana de Resistência",
        description: "Focado em aumentar a sua capacidade cardiovascular e resistência muscular.",
        schedule: {
            "Segunda": "Saltar à Corda (15 min) + Flexões (Máximo)",
            "Terça": "Dan Chi Sao (20 min) + Soco Direto (5 min contínuo)",
            "Quarta": "Burpees (10 min AMRAP - As Many Reps As Possible)",
            "Quinta": "Descanso Ativo (Caminhada leve)",
            "Sexta": "Saltar à Corda (20 min) + Prancha (Máximo)",
            "Sábado": "Siu Nim Tao (Lento e focado, 20 min)",
            "Domingo": "Descanso",
        }
    }
];

const PHILOSOPHY_CONTENT = [ /* ... (sem alterações) ... */ ];

const ALL_TRAINING_ITEMS = [];
Object.values(WING_CHUN_TRAINING).forEach(cat => ALL_TRAINING_ITEMS.push(...cat));
Object.values(CONDITIONING_TRAINING).forEach(cat => ALL_TRAINING_ITEMS.push(...cat));

// Adicionadas conquistas secretas e novas
const ACHIEVEMENTS = {
    'BEGINNER': { title: 'Um Novo Começo', desc: 'Começa a tua jornada.', icon: '🌱', check: (p) => p.xp > 0, secret: false },
    'YELLOW_BELT': { title: 'Cinturão Amarelo', desc: 'Alcança o nível Amarelo.', icon: '🟡', check: (p) => getUserBelt(p.xp).level >= 1, secret: false },
    'ORANGE_BELT': { title: 'Mestre da Siu Nim Tao', desc: 'Alcança o nível Laranja.', icon: '🟠', check: (p) => getUserBelt(p.xp).level >= 2, secret: false },
    'STREAK_7': { title: 'Aluno Dedicado', desc: 'Completa 7 dias de treino seguidos.', icon: '🔥', check: (p) => p.streak >= 7, secret: false },
    'STREAK_30': { title: 'Vontade de Ferro', desc: 'Completa 30 dias de treino seguidos.', icon: '❤️‍🔥', check: (p) => p.streak >= 30, secret: false },
    'NIGHT_OWL': { title: 'Coruja da Noite', desc: 'Completa um treino depois das 22h.', icon: '🦉', check: (p, date) => date.getHours() >= 22, secret: true },
    'HUNDRED_TRAININGS': { title: 'Centurião', desc: 'Completa 100 treinos.', icon: '💯', check: (p) => p.stats.trainingsCompleted >= 100, secret: false },
    'PHILOSOPHER': { title: 'Filósofo', desc: 'Lê todos os artigos de filosofia.', icon: '📜', check: (p) => p.stats.readPhilosophy >= PHILOSOPHY_CONTENT.length, secret: true },
};

// Novo: Títulos de Perfil
const PROFILE_TITLES = {
    'title_streak_7': { title: 'O Dedicado', achievementId: 'STREAK_7' },
    'title_orange_belt': { title: 'Mestre da Siu Nim Tao', achievementId: 'ORANGE_BELT' },
    'title_hundred': { title: 'Centurião', achievementId: 'HUNDRED_TRAININGS' },
};

const PROFILE_STORAGE_KEY = 'wingChunProfile_v8_pt';
