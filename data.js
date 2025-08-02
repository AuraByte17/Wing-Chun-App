// --- DADOS ---

const BELT_SYSTEM = [
    { level: 0, name: "Cinturão Branco", minXp: 0, color: "#ecf0f1", secondaryColor: "#bdc3c7" },
    { level: 1, name: "Cinturão Amarelo - Wing Chun", minXp: 150, color: "#f1c40f", secondaryColor: "#f39c12" },
    { level: 2, name: "Cinturão Laranja - Siu Nim Tao", minXp: 500, color: "#e67e22", secondaryColor: "#d35400" },
    { level: 3, name: "Cinturão Vermelho - Cham Kiu", minXp: 1000, color: "#e74c3c", secondaryColor: "#c0392b" },
    { level: 4, name: "Cinturão Verde - Muk Yan Jong", minXp: 1800, color: "#2ecc71", secondaryColor: "#27ae60" },
    { level: 5, name: "Cinturão Castanho - Biu Jee", minXp: 2800, color: "#a1662f", secondaryColor: "#6d4c41" },
    { level: 6, name: "Cinturão Preto", minXp: 4000, color: "#2c3e50", secondaryColor: "#000000" },
    { level: 7, name: "Cinturão Preto I - Luk Dim Boon Kwan", minXp: 5500, color: "#000000", secondaryColor: "#34495e" },
    { level: 8, name: "Cinturão Preto II - Baat Jaam Do", minXp: 7500, color: "#000000", secondaryColor: "#e74c3c" },
];

const WING_CHUN_TRAINING = {
    "Formas": [
        { id: "wc1", title: "A Pequena Ideia (Siu Nim Tao)", description: "A primeira forma, base de todo o sistema. Foco na estrutura, linha central e movimentos básicos.", xp: 150, requiredBelt: 2, video: "Siu_Nim_Tao" },
    ],
    "Andamentos (Juen Ma, Seung Ma)": [
        { id: "wc2", title: "Cavalo que Gira (Juen Ma)", description: "Treino de rotação da anca e postura para gerar força e mudar de direção.", xp: 20, requiredBelt: 1, video: "Juen_Ma" },
        { id: "wc3", title: "Cavalo que Avança (Seung Ma)", description: "Treino de avanço mantendo a estrutura e a linha central, para encurtar a distância.", xp: 20, requiredBelt: 1, video: "Seung_Ma" },
    ],
    "Socos nos Mitts": [
        { id: "wc4", title: "Socos em Yi Ji Kim Yeung Ma", description: "Prática de 1, 2 e 3 socos em cadeia na postura base para desenvolver a coordenação.", xp: 25, requiredBelt: 1, video: "Soco_YJKYM" },
        { id: "wc5", title: "Socos com Juen Ma", description: "Combinar o soco em cadeia com a rotação da postura (Juen Ma).", xp: 30, requiredBelt: 1, video: "Soco_Juen_Ma" },
        { id: "wc6", title: "Socos com Seung Ma", description: "Combinar o soco em cadeia com o avanço (Seung Ma).", xp: 30, requiredBelt: 1, video: "Soco_Seung_Ma" },
    ],
     "Pontapés (Gerk)": [
        { id: "wc7", title: "Frontal/Ascendente (Jing Gerk)", description: "Pontapé defensivo para atacar a curta distância, visando a zona baixa do oponente.", xp: 25, requiredBelt: 1, video: "Jing_Gerk" },
        { id: "wc8", title: "Lateral/Horizontal (Wang Gerk)", description: "Pontapé lateral para atacar os flancos ou joelhos do oponente.", xp: 25, requiredBelt: 1, video: "Wang_Gerk" },
    ],
    "Exercícios Específicos": [
        { id: "wc9", title: "Soco Barra Soco (Kuen Siu Kuen)", description: "Exercício para treinar a coordenação e o timing entre defesa e ataque.", xp: 30, requiredBelt: 1, video: "Kuen_Siu_Kuen" },
        { id: "wc10", title: "Exercício de Pak Sao (com Seung Ma)", description: "Treino de Pak Da (bater e atacar) e Tan Da (desviar e atacar) em movimento.", xp: 35, requiredBelt: 1, video: "Pak_Sao_Exercicio" },
        { id: "wc11", title: "Quatro Portões (Tan Da + Gaun Da)", description: "Exercício para treinar a defesa dos quatro 'portões' ou zonas de ataque.", xp: 35, requiredBelt: 1, video: "Quatro_Portoes" },
    ],
    "Mãos que Agarram (Lap Sao)": [
        { id: "wc12", title: "3 Trocas de Lap Sao", description: "Exercício fundamental para treinar o controlo, o timing e a sensibilidade ao puxar e atacar (Lap Sao, Soco, Gum Da).", xp: 40, requiredBelt: 1, video: "Lap_Sao" },
    ],
    "Mãos Coladas (Dan Chi Sao)": [
        { id: "wc13", title: "Troca em Tan Sao", description: "Exercício base de Chi Sao para desenvolver a sensibilidade e a reação ao contacto.", xp: 40, requiredBelt: 1, video: "Dan_Chi_Sao_Tan" },
        { id: "wc14", title: "Dan Chi Sao com Ataques", description: "Introdução de ataques e deslocamento em Seung Ma ao exercício de Chi Sao.", xp: 50, requiredBelt: 1, video: "Dan_Chi_Sao_Ataque" },
    ],
};

const CONDITIONING_TRAINING = {
    "Teste de Aptidão Física (Nível Amarelo)": [
        { id: "c1", title: "30 Flexões", description: "Teste de força do tronco e braços. As raparigas podem fazer de joelhos.", xp: 30, requiredBelt: 1, video: "Flexoes" },
        { id: "c2", title: "1 Minuto em Prancha", description: "Teste de resistência do core, fundamental para a estrutura do Wing Chun.", xp: 30, requiredBelt: 1, video: "Prancha" },
        { id: "c3", title: "30 Agachamentos", description: "Teste de força e resistência das pernas, a base de uma boa postura.", xp: 30, requiredBelt: 1, video: "Agachamentos" },
    ]
};

const PHILOSOPHY_CONTENT = [
    { 
        title: "O Sistema Completo: Uma Abordagem Integrada",
        text: "O desempenho de topo em Wing Chun não é apenas o resultado da prática técnica isolada. É um estado alcançado através da integração sinérgica de três pilares distintos, mas interligados: Mestria Técnica e Filosófica, Condicionamento Físico de Elite e Nutrição de Precisão. O caminho para a mestria exige não só compreender as técnicas, mas também forjar o corpo que as executa e abastecer o motor biológico que as potencia com uma eficiência devastadora."
    },
    {
        title: "Pilar 1: Mestria Técnica e Filosófica",
        text: "Este é o coração do Wing Chun. Envolve a aprendizagem e o refinamento das formas, posturas, técnicas de mãos e trabalho de pés. Mais do que a repetição, trata-se de compreender os princípios subjacentes, como a teoria da linha central, a economia de movimento e a simultaneidade de defesa e ataque. É a 'abordagem científica ao combate' que define a nossa arte."
    },
    {
        title: "Pilar 2: Condicionamento Físico de Elite",
        text: "O seu corpo é o veículo que expressa a sua técnica. Um condicionamento superior transforma a teoria em realidade. A força permite-lhe manter a estrutura sob pressão, a resistência permite-lhe treinar mais tempo e com mais intensidade, e a flexibilidade previne lesões e permite um movimento mais fluido e eficiente. Forjar este 'recipiente físico' é essencial."
    },
    {
        title: "Pilar 3: Nutrição de Precisão",
        text: "A nutrição é o combustível para o seu motor biológico. Uma alimentação adequada otimiza a recuperação muscular, fornece a energia necessária para sessões de treino exigentes e melhora a clareza mental. Sem o combustível certo, mesmo o motor mais bem afinado não terá o desempenho esperado. A sua dieta é uma parte integrante do seu treino."
    }
];

const ALL_TRAINING_ITEMS = [];
Object.values(WING_CHUN_TRAINING).forEach(cat => ALL_TRAINING_ITEMS.push(...cat));
Object.values(CONDITIONING_TRAINING).forEach(cat => ALL_TRAINING_ITEMS.push(...cat));

const ACHIEVEMENTS = {
    'BEGINNER': { title: 'Um Novo Começo', desc: 'Começa a tua jornada de Wing Chun.', icon: '🌱', check: (p) => p.xp > 0 },
    'YELLOW_BELT': { title: 'Cinturão Amarelo', desc: 'Alcança o primeiro nível de Wing Chun.', icon: '🟡', check: (p) => getUserBelt(p.xp).level >= 1 },
    'ORANGE_BELT': { title: 'Mestre da Siu Nim Tao', desc: 'Alcança o nível de Cinturão Laranja.', icon: '🟠', check: (p) => getUserBelt(p.xp).level >= 2 },
    'RED_BELT': { title: 'Mestre da Cham Kiu', desc: 'Alcança o nível de Cinturão Vermelho.', icon: '🔴', check: (p) => getUserBelt(p.xp).level >= 3 },
    'STREAK_7': { title: 'Aluno Dedicado', desc: 'Completa uma sequência de 7 dias de treino.', icon: '🔥', check: (p) => p.streak >= 7 },
    'STREAK_30': { title: 'Vontade de Ferro', desc: 'Completa uma sequência de 30 dias de treino.', icon: '❤️‍🔥', check: (p) => p.streak >= 30 },
};

const PROFILE_STORAGE_KEY = 'wingChunProfile_v5_pt';
