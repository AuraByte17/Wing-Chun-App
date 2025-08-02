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
    "Fundamentos (Nível Branco)": [
        { id: "wc1", title: "Yee Jee Kim Yeung Ma", description: "A postura base de treino. Foco na estrutura, relaxamento e enraizamento.", xp: 10, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Yee_Jee_Kim_Yeung_Ma.mp4" },
        { id: "wc2", title: "Man Sau / Wu Sau", description: "As posições de mão avançada (Man Sau) e mão de guarda (Wu Sau).", xp: 15, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Man_Sau_Wu_Sau.mp4" },
        { id: "wc3", title: "Soco Direto (Yat Chi Kuen)", description: "O soco em cadeia vertical. Foco na estrutura e relaxamento, não na força bruta.", xp: 15, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Soco_Direto.mp4" },
        { id: "wc4", title: "Cavalo que Avança (Seung Ma)", description: "Treino de avanço mantendo a estrutura e a linha central, para encurtar a distância.", xp: 20, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Seung_Ma.mp4" },
    ],
    "Técnicas (Nível Amarelo)": [
        { id: "wc5", title: "A Pequena Ideia (Siu Nim Tao)", description: "A primeira forma, base de todo o sistema. Foco na estrutura, linha central e movimentos básicos.", xp: 80, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Siu_Nim_Tao.mp4" },
        { id: "wc6", title: "Cavalo que Gira (Juen Ma)", description: "Treino de rotação da anca e postura para gerar força e mudar de direção.", xp: 20, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Juen_Ma.mp4" },
        { id: "wc7", title: "Socos com Juen Ma / Seung Ma", description: "Combinar o soco em cadeia com a rotação da postura (Juen Ma) e o avanço (Seung Ma).", xp: 30, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Socos_Movimento.mp4" },
        { id: "wc8", title: "Pontapé Frontal (Jing Gerk)", description: "Pontapé defensivo para atacar a curta distância, visando a zona baixa do oponente.", xp: 25, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Jing_Gerk.mp4" },
        { id: "wc9", title: "Tan Sau / Pak Sau", description: "Treinar os bloqueios básicos de deflexão com a palma para cima e em tapa.", xp: 25, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Tan_Pak_Sao.mp4" },
    ],
    "Técnicas Intermédias (Nível Laranja e Superior)": [
        { id: "wc10", title: "Bong Sau (Braço de Asa)", description: "Pratica a deflexão com o braço de asa. Usa-o para desviar forte pressão frontal.", xp: 30, requiredBelt: 2, difficulty: 'Intermédio', videoPath: "videos/Bong_Sau.mp4" },
        { id: "wc11", title: "Lap Sau (Mão que Puxa)", description: "Pratica puxar o oponente para o desequilibrar enquanto se ataca.", xp: 35, requiredBelt: 3, difficulty: 'Intermédio', videoPath: "videos/Lap_Sau.mp4" },
        { id: "wc12", title: "Fook Sau (Mão que Controla)", description: "Uma mão suave usada para sentir e controlar os braços do oponente.", xp: 35, requiredBelt: 4, difficulty: 'Intermédio', videoPath: "videos/Fook_Sau.mp4" },
        { id: "wc13", title: "Cham Kiu (Procurar a Ponte)", description: "A segunda forma. Foco na unidade corporal, rotação, passos e pontapés.", xp: 150, requiredBelt: 3, difficulty: 'Intermédio', videoPath: "videos/Cham_Kiu.mp4" },
    ],
    "Técnicas Avançadas": [
        { id: "wc14", title: "Muk Yan Jong (Homem de Madeira)", description: "Treino na forma do boneco de madeira para refinar ângulos, posições e força.", xp: 200, requiredBelt: 4, difficulty: 'Avançado', videoPath: "videos/Muk_Yan_Jong.mp4" },
        { id: "wc15", title: "Biu Jee (Dedos que Furam)", description: "A terceira forma, focada em técnicas de emergência e recuperação da linha central.", xp: 250, requiredBelt: 5, difficulty: 'Avançado', videoPath: "videos/Biu_Jee.mp4" },
        { id: "wc16", title: "Luk Dim Boon Kwan (Bastão Longo)", description: "Treino com o bastão de 6 pontos e meio para desenvolver força e precisão.", xp: 300, requiredBelt: 7, difficulty: 'Avançado', videoPath: "videos/Bastao.mp4" },
        { id: "wc17", title: "Baat Jaam Do (Facas de Oito Cortes)", description: "Treino com as facas borboleta, a extensão máxima das mãos do praticante.", xp: 350, requiredBelt: 8, difficulty: 'Avançado', videoPath: "videos/Facas.mp4" },
    ]
};

const CONDITIONING_TRAINING = {
    "Condicionamento Essencial (Nível Branco)": [
        { id: "c1", title: "Flexões", description: "Desenvolve a força do tronco e braços. Começa com um número confortável e aumenta.", xp: 15, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Flexoes.mp4" },
        { id: "c2", title: "Agachamentos", description: "Desenvolve a força das pernas para uma postura estável. Mantém as costas direitas.", xp: 15, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Agachamentos.mp4" },
        { id: "c3", title: "Prancha", description: "Fortalece o core para manter a estrutura. Tenta aguentar por períodos crescentes.", xp: 20, requiredBelt: 0, difficulty: 'Iniciante', videoPath: "videos/Prancha.mp4" },
    ],
    "Teste de Aptidão Física (Nível Amarelo)": [
        { id: "c4", title: "30 Flexões", description: "Teste de força do tronco e braços. As raparigas podem fazer de joelhos.", xp: 30, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Flexoes_Teste.mp4" },
        { id: "c5", title: "1 Minuto em Prancha", description: "Teste de resistência do core, fundamental para a estrutura do Wing Chun.", xp: 30, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Prancha_Teste.mp4" },
        { id: "c6", title: "30 Agachamentos", description: "Teste de força e resistência das pernas, a base de uma boa postura.", xp: 30, requiredBelt: 1, difficulty: 'Iniciante', videoPath: "videos/Agachamentos_Teste.mp4" },
    ],
    "Condicionamento Avançado": [
        { id: "c7", title: "Isometria na Parede", description: "Cria resistência nas pernas para manter as posturas por mais tempo.", xp: 25, requiredBelt: 2, difficulty: 'Intermédio', videoPath: "videos/Isometria_Parede.mp4" },
        { id: "c8", title: "Flexões Diamante", description: "Variante de flexão para maior foco nos tríceps, crucial para o soco Wing Chun.", xp: 35, requiredBelt: 4, difficulty: 'Avançado', videoPath: "videos/Flexoes_Diamante.mp4" },
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

const PROFILE_STORAGE_KEY = 'wingChunProfile_v6_pt';
