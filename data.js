// --- DADOS ---

const BELT_SYSTEM = [
    { level: 0, name: "Cinturão Branco", minXp: 0, color: "#ecf0f1", secondaryColor: "#bdc3c7" },
    { level: 1, name: "Cinturão Amarelo", minXp: 100, color: "#f1c40f", secondaryColor: "#f39c12" },
    { level: 2, name: "Cinturão Laranja", minXp: 300, color: "#e67e22", secondaryColor: "#d35400" },
    { level: 3, name: "Cinturão Verde", minXp: 600, color: "#2ecc71", secondaryColor: "#27ae60" },
    { level: 4, name: "Cinturão Azul", minXp: 1000, color: "#3498db", secondaryColor: "#2980b9" },
    { level: 5, name: "Cinturão Roxo", minXp: 1500, color: "#9b59b6", secondaryColor: "#8e44ad" },
    { level: 6, name: "Cinturão Castanho", minXp: 2200, color: "#a1662f", secondaryColor: "#6d4c41" },
    { level: 7, name: "Cinturão Preto", minXp: 3000, color: "#34495e", secondaryColor: "#2c3e50" },
    { level: 8, name: "Mestre", minXp: 5000, color: "#e74c3c", secondaryColor: "#c0392b" },
];

const WING_CHUN_TRAINING = {
    "Posturas e Trabalho de Pés": [
        { id: "wc1", title: "Yee Jee Kim Yeung Ma", description: "Pratica a postura básica de treino. Foca-te na estrutura, relaxamento e enraizamento.", xp: 10, requiredBelt: 0, video: "Yee_Jee_Kim_Yeung_Ma" },
        { id: "wc2", title: "Man Sau / Wu Sau", description: "Treina as posições de mão avançada (Man Sau) e mão de guarda (Wu Sau).", xp: 15, requiredBelt: 0, video: "Man_Sau_Wu_Sau" },
        { id: "wc3", title: "Passos Básicos", description: "Pratica os passos para a frente, para trás e em rotação, mantendo a integridade da postura.", xp: 20, requiredBelt: 1, video: "Passos_Basicos" },
        { id: "wc4", title: "Deslocação (Biu Ma)", description: "Pratica a deslocação do peso corporal para gerar potência e evasão.", xp: 25, requiredBelt: 2, video: "Deslocacao" },
    ],
    "Técnicas de Mãos": [
        { id: "wc5", title: "Soco Direto (Yat Chi Kuen)", description: "Pratica o soco em cadeia vertical. Foca-te na estrutura e relaxamento, não na força.", xp: 15, requiredBelt: 0, video: "Soco_Direto" },
        { id: "wc6", title: "Tan Sau (Bloqueio Palma p/ Cima)", description: "Treina o bloqueio básico de deflexão com a palma para cima. Foca-te na energia do cotovelo.", xp: 20, requiredBelt: 1, video: "Tan_Sau" },
        { id: "wc7", title: "Pak Sau (Bloqueio em Tapa)", description: "Pratica a deflexão em tapa. Deve ser rápido e redirecionar a energia.", xp: 20, requiredBelt: 1, video: "Pak_Sau" },
        { id: "wc8", title: "Bong Sau (Bloqueio Braço de Asa)", description: "Pratica a deflexão com o braço de asa. Usa-o para desviar forte pressão frontal.", xp: 30, requiredBelt: 2, video: "Bong_Sau" },
        { id: "wc9", title: "Lap Sau (Mão que Puxa)", description: "Pratica puxar o oponente para o desequilibrar enquanto se ataca.", xp: 35, requiredBelt: 3, video: "Lap_Sau" },
        { id: "wc10", title: "Fook Sau (Mão que Controla)", description: "Uma mão suave usada para sentir e controlar os braços do oponente.", xp: 35, requiredBelt: 4, video: "Fook_Sau" },
    ],
    "Formas": [
        { id: "wc11", title: "Siu Nim Tao (Pequena Ideia)", description: "Pratica a primeira forma. Foca-te na quietude, estrutura e geração de energia.", xp: 100, requiredBelt: 2, video: "Siu_Nim_Tao" },
        { id: "wc12", title: "Chum Kiu (Procurar a Ponte)", description: "Pratica a segunda forma. Foca-te na unidade corporal, rotação e passos.", xp: 150, requiredBelt: 4, video: "Chum_Kiu" },
        { id: "wc13", title: "Biu Jee (Dedos que Furam)", description: "A terceira forma, focada em técnicas de emergência e geração de potência.", xp: 200, requiredBelt: 6, video: "Biu_Jee" },
    ]
};

const CONDITIONING_TRAINING = {
    "Força": [
        { id: "c1", title: "Flexões", description: "Desenvolve a força do tronco e do core, essencial para socos potentes.", xp: 15, requiredBelt: 0, video: "Flexoes" },
        { id: "c2", title: "Agachamentos", description: "Desenvolve a força das pernas para uma postura estável e trabalho de pés poderoso.", xp: 15, requiredBelt: 0, video: "Agachamentos" },
        { id: "c3", title: "Prancha", description: "Fortalece o core para manter a estrutura durante as técnicas.", xp: 20, requiredBelt: 1, video: "Prancha" },
        { id: "c4", title: "Isometria na Parede", description: "Cria resistência nas pernas para manter as posturas.", xp: 25, requiredBelt: 2, video: "Isometria_Parede" },
    ],
    "Flexibilidade e Mobilidade": [
        { id: "c5", title: "Rotações de Ombros", description: "Melhora a mobilidade dos ombros para técnicas de mãos fluidas.", xp: 10, requiredBelt: 0, video: "Rotacoes_Ombros" },
        { id: "c6", title: "Círculos com a Anca", description: "Aumenta a flexibilidade da anca para melhores rotações e pontapés.", xp: 10, requiredBelt: 1, video: "Circulos_Anca" },
        { id: "c7", title: "Rotações de Pulsos e Tornozelos", description: "Essencial para prevenir lesões e manter a flexibilidade em articulações chave.", xp: 5, requiredBelt: 0, video: "Rotacoes_Pulsos" },
        { id: "c8", title: "Alongamentos Dinâmicos de Isquiotibiais", description: "Melhora a flexibilidade para pontapés e posturas baixas.", xp: 15, requiredBelt: 3, video: "Alongamentos_Dinamicos" },
    ]
};

const ALL_TRAINING_ITEMS = [];
Object.values(WING_CHUN_TRAINING).forEach(cat => ALL_TRAINING_ITEMS.push(...cat));
Object.values(CONDITIONING_TRAINING).forEach(cat => ALL_TRAINING_ITEMS.push(...cat));

const ACHIEVEMENTS = {
    'BEGINNER': { title: 'Um Novo Começo', desc: 'Começa a tua jornada de Wing Chun.', icon: '🌱', check: (p) => p.xp > 0 },
    'YELLOW_BELT': { title: 'Primeira Promoção', desc: 'Alcança o nível de Cinturão Amarelo.', icon: '🟡', check: (p) => getUserBelt(p.xp).level >= 1 },
    'GREEN_BELT': { title: 'A Meio Caminho', desc: 'Alcança o nível de Cinturão Verde.', icon: '🟢', check: (p) => getUserBelt(p.xp).level >= 3 },
    'BLACK_BELT': { title: 'Mestre dos Básicos', desc: 'Alcança o nível de Cinturão Preto.', icon: '⚫', check: (p) => getUserBelt(p.xp).level >= 7 },
    'STREAK_7': { title: 'Aluno Dedicado', desc: 'Completa uma sequência de 7 dias de treino.', icon: '🔥', check: (p) => p.streak >= 7 },
    'STREAK_30': { title: 'Vontade de Ferro', desc: 'Completa uma sequência de 30 dias de treino.', icon: '❤️‍🔥', check: (p) => p.streak >= 30 },
    'SIU_NIM_TAO': { title: 'Pequena Ideia', desc: 'Desbloqueia a primeira forma, Siu Nim Tao.', icon: '💡', check: (p) => getUserBelt(p.xp).level >= 2 },
};

const PROFILE_STORAGE_KEY = 'wingChunProfile_v4_pt';
