export const ACHIEVEMENT_CATEGORIES = [
  { id: 'capturas', icon: '🎣', label: 'Capturas' },
  { id: 'especies', icon: '🐟', label: 'Espécies' },
  { id: 'recordes', icon: '📏', label: 'Recordes' },
  { id: 'momentos', icon: '🌅', label: 'Momentos' },
  { id: 'exploracao', icon: '📍', label: 'Exploração' },
  { id: 'humor', icon: '😂', label: 'Humor' },
  { id: 'especiais', icon: '🏅', label: 'Especiais' },
];

const achievement = (id, icon, name, description, category, condition, requirement) => ({
  id,
  icon,
  name,
  description,
  category,
  condition,
  requirement,
});

const speciesAchievement = (id, icon, name, species) =>
  achievement(
    id,
    icon,
    name,
    `Capture ${name.toLocaleLowerCase('pt-BR').replace('primeiro ', 'seu primeiro ').replace('primeira ', 'sua primeira ')}.`,
    'especies',
    `Registrar 1 ${species}.`,
    { type: 'species_count', value: species, count: 1 },
  );

export const ACHIEVEMENTS = {
  FIRST_CAPTURE: achievement('first_capture', '🎣', 'Primeira Captura', 'Primeiro peixe registrado.', 'capturas', 'Registrar 1 peixe.', {
    type: 'captures',
    value: 1,
  }),
  BEGINNER_FISHER: achievement('beginner_fisher', '🐟', 'Pescador Iniciante', '10 peixes registrados.', 'capturas', 'Registrar 10 peixes.', {
    type: 'captures',
    value: 10,
  }),
  DEDICATED_FISHER: achievement('dedicated_fisher', '🥉', 'Pescador Dedicado', '25 peixes registrados.', 'capturas', 'Registrar 25 peixes.', {
    type: 'captures',
    value: 25,
  }),
  ROD_MASTER: achievement('rod_master', '🥈', 'Mestre da Vara', '50 peixes registrados.', 'capturas', 'Registrar 50 peixes.', {
    type: 'captures',
    value: 50,
  }),
  VETERAN: achievement('veteran', '🥇', 'Veterano', '100 peixes registrados.', 'capturas', 'Registrar 100 peixes.', {
    type: 'captures',
    value: 100,
  }),
  EXPERIENCED_HUNTER: achievement('experienced_hunter', '🏆', 'Caçador Experiente', '250 peixes registrados.', 'capturas', 'Registrar 250 peixes.', {
    type: 'captures',
    value: 250,
  }),
  WATERS_LEGEND: achievement('waters_legend', '👑', 'Lenda das Águas', '500 peixes registrados.', 'capturas', 'Registrar 500 peixes.', {
    type: 'captures',
    value: 500,
  }),
  UNSTOPPABLE: achievement('unstoppable', '💎', 'Imparável', '1000 peixes registrados.', 'capturas', 'Registrar 1000 peixes.', {
    type: 'captures',
    value: 1000,
  }),
  FISHING_GOD: achievement('fishing_god', '🔥', 'Deus da Pesca', '5000 peixes registrados.', 'capturas', 'Registrar 5000 peixes.', {
    type: 'captures',
    value: 5000,
  }),

  FIRST_TUCUNARE: speciesAchievement('first_tucunare', '🐟', 'Primeiro Tucunaré', 'tucunaré'),
  FIRST_TRAIRA: speciesAchievement('first_traira', '🐍', 'Primeira Traíra', 'traíra'),
  FIRST_DOURADO: speciesAchievement('first_dourado', '🦁', 'Primeiro Dourado', 'dourado'),
  FIRST_PINTADO: speciesAchievement('first_pintado', '🐅', 'Primeiro Pintado', 'pintado'),
  FIRST_SURUBIM: speciesAchievement('first_surubim', '🐱', 'Primeiro Surubim', 'surubim'),
  FIRST_JAU: speciesAchievement('first_jau', '🐋', 'Primeiro Jaú', 'jaú'),
  FIRST_PIRARUCU: speciesAchievement('first_pirarucu', '🐟', 'Primeiro Pirarucu', 'pirarucu'),
  FIRST_TAMBAQUI: speciesAchievement('first_tambaqui', '🐟', 'Primeiro Tambaqui', 'tambaqui'),
  FIRST_PACU: speciesAchievement('first_pacu', '🐟', 'Primeiro Pacu', 'pacu'),
  FIRST_TILAPIA: speciesAchievement('first_tilapia', '🐟', 'Primeira Tilápia', 'tilápia'),
  FIRST_LAMBARI: speciesAchievement('first_lambari', '🐟', 'Primeiro Lambari', 'lambari'),
  FIRST_BAGRE: speciesAchievement('first_bagre', '🐟', 'Primeiro Bagre', 'bagre'),
  FIRST_CASCUDO: speciesAchievement('first_cascudo', '🐟', 'Primeiro Cascudo', 'cascudo'),
  FIRST_PIAU: speciesAchievement('first_piau', '🐟', 'Primeiro Piau', 'piau'),
  FIRST_CARPA: speciesAchievement('first_carpa', '🐟', 'Primeira Carpa', 'carpa'),
  FIRST_PIRANHA: speciesAchievement('first_piranha', '🐟', 'Primeira Piranha', 'piranha'),
  FIRST_ROBALO: speciesAchievement('first_robalo', '🐟', 'Primeiro Robalo', 'robalo'),
  FIRST_TAINHA: speciesAchievement('first_tainha', '🐠', 'Primeira Tainha', 'tainha'),
  FIRST_ATUM: speciesAchievement('first_atum', '🐠', 'Primeiro Atum', 'atum'),
  FIRST_MARLIM: speciesAchievement('first_marlim', '🐠', 'Primeiro Marlim', 'marlim'),
  FIRST_GAROUPA: speciesAchievement('first_garoupa', '🐠', 'Primeira Garoupa', 'garoupa'),
  FIRST_BADEJO: speciesAchievement('first_badejo', '🐠', 'Primeiro Badejo', 'badejo'),
  FIRST_TUBARAO: speciesAchievement('first_tubarao', '🐠', 'Primeiro Tubarão', 'tubarão'),
  FIRST_RAIA: speciesAchievement('first_raia', '🐠', 'Primeira Raia', 'raia'),
  FIRST_CUMBACA: speciesAchievement('first_cumbaca', '🐡', 'Primeira Cumbaca', 'cumbaca'),
  AQUATIC_DIVERSITY: achievement('aquatic_diversity', '🌎', 'Diversidade Aquática', '5 espécies diferentes registradas.', 'especies', 'Registrar 5 espécies diferentes.', {
    type: 'total_species',
    value: 5,
  }),
  EXPLORER: achievement('explorer', '🦈', 'Explorador', '10 espécies diferentes registradas.', 'especies', 'Registrar 10 espécies diferentes.', {
    type: 'total_species',
    value: 10,
  }),
  SPECIES_MASTER: achievement('species_master', '🐊', 'Mestre das Espécies', '20 espécies diferentes registradas.', 'especies', 'Registrar 20 espécies diferentes.', {
    type: 'total_species',
    value: 20,
  }),
  LIVING_ENCYCLOPEDIA: achievement('living_encyclopedia', '👑', 'Enciclopédia Viva', '50 espécies diferentes registradas.', 'especies', 'Registrar 50 espécies diferentes.', {
    type: 'total_species',
    value: 50,
  }),
  SUPREME_COLLECTOR: achievement('supreme_collector', '💎', 'Colecionador Supremo', '100 espécies diferentes registradas.', 'especies', 'Registrar 100 espécies diferentes.', {
    type: 'total_species',
    value: 100,
  }),

  FIRST_OVER_1KG: achievement('first_over_1kg', '📏', 'Primeiro peixe acima de 1 kg', 'Um peixe acima de 1 kg registrado.', 'recordes', 'Registrar um peixe com pelo menos 1 kg.', {
    type: 'largest_fish',
    value: 1,
  }),
  HEAVYWEIGHT: achievement('heavyweight', '💪', 'Peso Pesado', 'Um peixe de 5 kg registrado.', 'recordes', 'Registrar um peixe com pelo menos 5 kg.', {
    type: 'largest_fish',
    value: 5,
  }),
  GIANT: achievement('giant', '🐊', 'Gigante', 'Um peixe de 10 kg registrado.', 'recordes', 'Registrar um peixe com pelo menos 10 kg.', {
    type: 'largest_fish',
    value: 10,
  }),
  WATER_MONSTER: achievement('water_monster', '👹', 'Monstro das Águas', 'Um peixe de 20 kg registrado.', 'recordes', 'Registrar um peixe com pelo menos 20 kg.', {
    type: 'largest_fish',
    value: 20,
  }),
  RIVER_TITAN: achievement('river_titan', '🦖', 'Titã dos Rios', 'Um peixe de 30 kg registrado.', 'recordes', 'Registrar um peixe com pelo menos 30 kg.', {
    type: 'largest_fish',
    value: 30,
  }),
  HALF_METER: achievement('half_meter', '📐', 'Meio Metro', 'Um peixe de 50 cm registrado.', 'recordes', 'Registrar um peixe com pelo menos 50 cm.', {
    type: 'largest_length',
    value: 50,
  }),
  ONE_METER: achievement('one_meter', '📏', 'Um Metro', 'Um peixe de 100 cm registrado.', 'recordes', 'Registrar um peixe com pelo menos 100 cm.', {
    type: 'largest_length',
    value: 100,
  }),
  RECORD_HOLDER: achievement('record_holder', '🏆', 'Recordista', 'Quebre seu próprio recorde de peso.', 'recordes', 'Registrar uma captura mais pesada que seu recorde anterior.', {
    type: 'personal_record_break',
    value: true,
  }),
  LIVING_LEGEND_RECORD: achievement('living_legend_record', '👑', 'Lenda Viva', 'Maior peixe já registrado.', 'recordes', 'Registrar o maior peixe da plataforma.', {
    type: 'manual',
    value: true,
  }),

  EARLY_BIRD: achievement('early_bird', '🌅', 'Madrugador', 'Uma captura feita no começo da manhã.', 'momentos', 'Registrar uma captura entre 5h e 7h.', {
    type: 'time',
    value: 'early_morning',
  }),
  SUNSET: achievement('sunset', '🌇', 'Entardecer', 'Uma captura feita no fim do dia.', 'momentos', 'Registrar uma captura entre 17h e 19h.', {
    type: 'time',
    value: 'sunset',
  }),
  NIGHT_OWL: achievement('night_owl', '🌙', 'Coruja da Pesca', 'Uma captura feita à noite.', 'momentos', 'Registrar uma captura entre 20h e 6h.', {
    type: 'time',
    value: 'night',
  }),
  RAIN_WARRIOR: achievement('rain_warrior', '🌧️', 'Guerreiro da Chuva', 'Pescaria registrada em dia de chuva.', 'momentos', 'Registrar uma captura marcada com chuva.', {
    type: 'manual',
    value: true,
  }),
  STORM: achievement('storm', '⚡', 'Tempestade', 'Pescaria registrada em tempestade.', 'momentos', 'Registrar uma captura marcada com tempestade.', {
    type: 'manual',
    value: true,
  }),
  HOT_SUN: achievement('hot_sun', '☀️', 'Sol Escaldante', 'Pescaria registrada em calor intenso.', 'momentos', 'Registrar uma captura marcada com sol forte.', {
    type: 'manual',
    value: true,
  }),
  FREEZING_COLD: achievement('freezing_cold', '❄️', 'Frio Congelante', 'Pescaria registrada em frio intenso.', 'momentos', 'Registrar uma captura marcada com frio intenso.', {
    type: 'manual',
    value: true,
  }),
  CHRISTMAS_FISHING: achievement('christmas_fishing', '🎄', 'Natal na Pesca', 'Uma captura registrada no Natal.', 'momentos', 'Registrar uma captura em 25/12.', {
    type: 'date_month_day',
    month: 12,
    day: 25,
  }),
  NEW_YEAR_FISHING: achievement('new_year_fishing', '🎆', 'Ano Novo na Pesca', 'Uma captura registrada no Ano Novo.', 'momentos', 'Registrar uma captura em 01/01.', {
    type: 'date_month_day',
    month: 1,
    day: 1,
  }),
  VALENTINES_DAY: achievement('valentines_day', '❤️', 'Dia dos Namorados', 'Uma captura registrada no Dia dos Namorados.', 'momentos', 'Registrar uma captura em 12/06.', {
    type: 'date_month_day',
    month: 6,
    day: 12,
  }),
  BIRTHDAY: achievement('birthday', '🎂', 'Aniversariante', 'Pesque no seu aniversário.', 'momentos', 'Registrar uma captura na data de aniversário do perfil.', {
    type: 'manual',
    value: true,
  }),

  FIRST_LOCATION: achievement('first_location', '🗺️', 'Primeiro Local', 'Primeiro local de pesca registrado.', 'exploracao', 'Registrar capturas em 1 local.', {
    type: 'different_locations',
    value: 1,
  }),
  FIVE_LOCATIONS: achievement('five_locations', '🏞️', '5 Locais', '5 locais diferentes registrados.', 'exploracao', 'Registrar capturas em 5 locais diferentes.', {
    type: 'different_locations',
    value: 5,
  }),
  TEN_LOCATIONS: achievement('ten_locations', '🌎', '10 Locais', '10 locais diferentes registrados.', 'exploracao', 'Registrar capturas em 10 locais diferentes.', {
    type: 'different_locations',
    value: 10,
  }),
  TWENTY_LOCATIONS: achievement('twenty_locations', '🚤', '20 Locais', '20 locais diferentes registrados.', 'exploracao', 'Registrar capturas em 20 locais diferentes.', {
    type: 'different_locations',
    value: 20,
  }),
  FIFTY_LOCATIONS: achievement('fifty_locations', '⛺', '50 Locais', '50 locais diferentes registrados.', 'exploracao', 'Registrar capturas em 50 locais diferentes.', {
    type: 'different_locations',
    value: 50,
  }),
  RIVER_MASTER: achievement('river_master', '🏕️', 'Mestre dos Rios', 'Capturas registradas em rios.', 'exploracao', 'Registrar uma captura em local contendo "rio".', {
    type: 'location_contains',
    values: ['rio'],
  }),
  DAM_LORD: achievement('dam_lord', '🌊', 'Senhor das Represas', 'Capturas registradas em represas.', 'exploracao', 'Registrar uma captura em local contendo "represa".', {
    type: 'location_contains',
    values: ['represa'],
  }),
  SEA_KING: achievement('sea_king', '🏖️', 'Rei do Mar', 'Capturas registradas no mar.', 'exploracao', 'Registrar uma captura em local contendo "mar", "praia" ou "oceano".', {
    type: 'location_contains',
    values: ['mar', 'praia', 'oceano'],
  }),

  TEN_LIKES: achievement('ten_likes', '👍', '10 Curtidas', '10 curtidas recebidas em capturas.', 'comunidade', 'Receber 10 curtidas nas capturas.', {
    type: 'total_likes',
    value: 10,
  }),
  FIFTY_LIKES: achievement('fifty_likes', '❤️', '50 Curtidas', '50 curtidas recebidas em capturas.', 'comunidade', 'Receber 50 curtidas nas capturas.', {
    type: 'total_likes',
    value: 50,
  }),
  HUNDRED_LIKES: achievement('hundred_likes', '🔥', '100 Curtidas', '100 curtidas recebidas em capturas.', 'comunidade', 'Receber 100 curtidas nas capturas.', {
    type: 'total_likes',
    value: 100,
  }),
  FIVE_HUNDRED_LIKES: achievement('five_hundred_likes', '🌟', '500 Curtidas', '500 curtidas recebidas em capturas.', 'comunidade', 'Receber 500 curtidas nas capturas.', {
    type: 'total_likes',
    value: 500,
  }),
  THOUSAND_LIKES: achievement('thousand_likes', '👑', '1000 Curtidas', '1000 curtidas recebidas em capturas.', 'comunidade', 'Receber 1000 curtidas nas capturas.', {
    type: 'total_likes',
    value: 1000,
  }),
  FIRST_FOLLOWER: achievement('first_follower', '🤝', 'Primeiro Seguidor', 'Seu primeiro seguidor no FishRank.', 'comunidade', 'Receber 1 seguidor.', {
    type: 'manual',
    value: true,
  }),
  TEN_FOLLOWERS: achievement('ten_followers', '🎉', '10 Seguidores', '10 seguidores no FishRank.', 'comunidade', 'Receber 10 seguidores.', {
    type: 'manual',
    value: true,
  }),
  HUNDRED_FOLLOWERS: achievement('hundred_followers', '⭐', '100 Seguidores', '100 seguidores no FishRank.', 'comunidade', 'Receber 100 seguidores.', {
    type: 'manual',
    value: true,
  }),

  CUMBACA_FISHER: achievement('cumbaca_fisher', '🐡', 'Pescador de Cumbaca', 'Conseguiu capturar uma cumbaca.', 'humor', 'Registrar 1 cumbaca.', {
    type: 'species_count',
    value: 'cumbaca',
    count: 1,
  }),
  TANGLED_KING: achievement('tangled_king', '🌿', 'Rei do Enrosco', 'A linha não colaborou.', 'humor', 'Desbloqueio manual por evento de enrosco.', {
    type: 'manual',
    value: true,
  }),
  TREE_FISHER: achievement('tree_fisher', '🌳', 'Pescador de Árvore', 'Quando o arremesso virou história.', 'humor', 'Desbloqueio manual por acertar árvore.', {
    type: 'manual',
    value: true,
  }),
  ROCK_MASTER: achievement('rock_master', '🪨', 'Mestre das Pedras', 'Especialista em fisgar pedra.', 'humor', 'Desbloqueio manual por evento de pedra.', {
    type: 'manual',
    value: true,
  }),
  OFFICIAL_UNLUCKY: achievement('official_unlucky', '😅', 'Azarado Oficial', 'Quando a pescaria vira resenha.', 'humor', 'Desbloqueio manual por sequência de azar.', {
    type: 'manual',
    value: true,
  }),
  FORGOT_BAIT: achievement('forgot_bait', '🎒', 'Esqueceu a Isca', 'Chegou preparado, quase.', 'humor', 'Desbloqueio manual por esquecer a isca.', {
    type: 'manual',
    value: true,
  }),
  ATE_BAIT: achievement('ate_bait', '🪝', 'Comeu a Isca', 'A isca sumiu e a suspeita ficou.', 'humor', 'Desbloqueio manual por perder a isca.', {
    type: 'manual',
    value: true,
  }),
  PHOTO_ONLY: achievement('photo_only', '🤣', 'Só Foto', 'A foto salvou a pescaria.', 'humor', 'Desbloqueio manual por evento sem captura válida.', {
    type: 'manual',
    value: true,
  }),
  ZEROED_RETURN: achievement('zeroed_return', '😭', 'Voltou Zerado', 'Acontece nas melhores pescarias.', 'humor', 'Desbloqueio manual por voltar sem capturas.', {
    type: 'manual',
    value: true,
  }),

  WEEK_CHAMPION: achievement('week_champion', '🥇', 'Campeão da Semana', 'Campeão semanal do FishRank.', 'especiais', 'Ficar em primeiro no ranking semanal.', {
    type: 'manual',
    value: true,
  }),
  MONTH_CHAMPION: achievement('month_champion', '🥇', 'Campeão do Mês', 'Campeão mensal do FishRank.', 'especiais', 'Ficar em primeiro no ranking mensal.', {
    type: 'manual',
    value: true,
  }),
  RANKING_NUMBER_ONE: achievement('ranking_number_one', '👑', 'Número 1 do Ranking', 'Topo do ranking geral.', 'especiais', 'Ficar em primeiro no ranking geral.', {
    type: 'manual',
    value: true,
  }),
  ONE_YEAR_VETERAN: achievement('one_year_veteran', '⭐', 'Veterano (1 ano)', 'Um ano de FishRank.', 'especiais', 'Ter conta há pelo menos 365 dias.', {
    type: 'account_age_days',
    value: 365,
  }),
  FISHRANK_LEGEND: achievement('fishrank_legend', '💎', 'Lenda FishRank (5 anos)', 'Cinco anos de FishRank.', 'especiais', 'Ter conta há pelo menos 1825 dias.', {
    type: 'account_age_days',
    value: 1825,
  }),
  FOUNDER: achievement('founder', '🎖️', 'Fundador do FishRank', 'Participou da fundação do FishRank.', 'especiais', 'Desbloqueio manual para fundadores.', {
    type: 'manual',
    value: true,
  }),
  BETA_TESTER: achievement('beta_tester', '👑', 'Beta Tester', 'Ajudou a testar o FishRank.', 'especiais', 'Desbloqueio manual para beta testers.', {
    type: 'manual',
    value: true,
  }),
  FIRST_LOGIN: achievement('first_login', '🎉', 'Primeiro Login', 'Primeiro acesso ao FishRank.', 'especiais', 'Entrar no FishRank pela primeira vez.', {
    type: 'profile_exists',
    value: true,
  }),
  FIRST_SHARE: achievement('first_share', '📱', 'Primeiro Compartilhamento', 'Primeira captura compartilhada.', 'especiais', 'Compartilhar uma captura.', {
    type: 'manual',
    value: true,
  }),
  HUNDRED_DAY_STREAK: achievement('hundred_day_streak', '🔥', '100 Dias Consecutivos', '100 dias consecutivos de atividade.', 'especiais', 'Registrar atividade por 100 dias consecutivos.', {
    type: 'consecutive_capture_days',
    value: 100,
  }),
  YEAR_STREAK: achievement('year_streak', '⚡', '365 Dias Consecutivos', '365 dias consecutivos de atividade.', 'especiais', 'Registrar atividade por 365 dias consecutivos.', {
    type: 'consecutive_capture_days',
    value: 365,
  }),
};

export const ACHIEVEMENT_CATEGORY_LABELS = Object.fromEntries(
  ACHIEVEMENT_CATEGORIES.map((category) => [category.id, `${category.icon} ${category.label}`]),
);

export const getAchievementById = (achievementId) =>
  Object.values(ACHIEVEMENTS).find((achievement) => achievement.id === achievementId) || null;

export const getAllAchievements = () => Object.values(ACHIEVEMENTS);
