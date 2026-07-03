export const TITLE_CATEGORIES = {
  progress: 'Títulos de Progresso',
  species: 'Títulos de Espécies',
  exploration: 'Títulos de Exploração',
  records: 'Títulos de Recordes',
  champions: 'Títulos de Campeões',
  humor: 'Títulos de Humor',
  legendary: 'Títulos Lendários',
  secret: 'Títulos Secretos',
};

const title = (id, icon, name, description, type, requirement) => ({
  id,
  icon,
  name,
  description,
  type,
  requirement,
});

export const TITLES = {
  FISHING_BEGINNER: title('fishing_beginner', '🌱', 'Pescador Iniciante', 'Seu primeiro passo na comunidade FishRank.', 'progress', {
    type: 'profile_exists',
    value: true,
  }),
  FISHER: title('fisher', '🎣', 'Pescador', 'Primeira captura registrada.', 'progress', { type: 'captures', value: 1 }),
  EXPERIENCED_FISHER: title('experienced_fisher', '🎯', 'Pescador Experiente', '10 capturas registradas.', 'progress', {
    type: 'captures',
    value: 10,
  }),
  ROD_MASTER: title('rod_master_title', '🏅', 'Mestre da Vara', '50 capturas registradas.', 'progress', { type: 'captures', value: 50 }),
  FISHING_MASTER: title('fishing_master', '🏆', 'Mestre da Pesca', '100 capturas registradas.', 'progress', { type: 'captures', value: 100 }),
  FISHING_KING: title('fishing_king', '👑', 'Rei da Pesca', '250 capturas registradas.', 'progress', { type: 'captures', value: 250 }),
  FISHING_LEGEND: title('fishing_legend', '💎', 'Lenda da Pesca', '500 capturas registradas.', 'progress', { type: 'captures', value: 500 }),
  FISHING_GOD: title('fishing_god_title', '🔥', 'Deus da Pesca', '5000 capturas registradas.', 'progress', { type: 'captures', value: 5000 }),

  GIANT_HUNTER: title('giant_hunter', '🐊', 'Caçador de Gigantes', 'Especialista em peixes grandes.', 'records', {
    type: 'largest_fish',
    value: 10,
  }),
  DOURADO_TAMER: title('dourado_tamer', '🦁', 'Domador de Dourados', 'Dourado registrado no FishRank.', 'species', {
    type: 'species_count',
    value: 'dourado',
    count: 1,
  }),
  TRAIRA_MASTER: title('traira_master', '🐍', 'Mestre das Traíras', 'Traíra registrada no FishRank.', 'species', {
    type: 'species_count',
    value: 'traíra',
    count: 1,
  }),
  TUCUNARE_KING: title('tucunare_king', '🐟', 'Rei dos Tucunarés', 'Tucunaré registrado no FishRank.', 'species', {
    type: 'species_count',
    value: 'tucunaré',
    count: 1,
  }),
  JAU_LORD: title('jau_lord', '🐋', 'Senhor dos Jaús', 'Jaú registrado no FishRank.', 'species', {
    type: 'species_count',
    value: 'jaú',
    count: 1,
  }),
  ROBALO_MASTER: title('robalo_master', '🐠', 'Mestre dos Robalos', 'Robalo registrado no FishRank.', 'species', {
    type: 'species_count',
    value: 'robalo',
    count: 1,
  }),

  WATERS_LORD: title('waters_lord', '🌊', 'Senhor das Águas', '500 kg somados em capturas.', 'exploration', {
    type: 'total_weight',
    value: 500,
  }),
  RIVER_MASTER: title('river_master_title', '🏞️', 'Mestre dos Rios', 'Captura registrada em rio.', 'exploration', {
    type: 'location_contains',
    values: ['rio'],
  }),
  DAM_CAPTAIN: title('dam_captain', '🚤', 'Capitão da Represa', 'Captura registrada em represa.', 'exploration', {
    type: 'location_contains',
    values: ['represa'],
  }),
  SEA_WOLF: title('sea_wolf', '⚓', 'Lobo do Mar', 'Captura registrada no mar.', 'exploration', {
    type: 'location_contains',
    values: ['mar', 'praia', 'oceano'],
  }),
  SHARK_HUNTER: title('shark_hunter', '🦈', 'Caçador de Tubarões', 'Tubarão registrado no FishRank.', 'species', {
    type: 'species_count',
    value: 'tubarão',
    count: 1,
  }),
  AQUATIC_EXPLORER: title('aquatic_explorer', '🌎', 'Explorador Aquático', '10 espécies diferentes registradas.', 'exploration', {
    type: 'total_species',
    value: 10,
  }),
  TRAVELER: title('traveler', '🗺️', 'Viajante', '10 locais diferentes registrados.', 'exploration', {
    type: 'different_locations',
    value: 10,
  }),

  RECORDIST: title('recordist', '📏', 'Recordista', 'Quebrou seu próprio recorde.', 'records', {
    type: 'personal_record_break',
    value: true,
  }),
  LIVING_LEGEND: title('living_legend', '👑', 'Lenda Viva', 'Peixe de 30 kg registrado.', 'records', {
    type: 'largest_fish',
    value: 30,
  }),
  CHAMPION: title('champion', '🏆', 'Campeão', 'Título de campeão FishRank.', 'champions', { type: 'manual', value: true }),
  WEEKLY_CHAMPION: title('weekly_champion', '🥇', 'Campeão Semanal', 'Campeão semanal do ranking.', 'champions', {
    type: 'manual',
    value: true,
  }),
  MONTHLY_CHAMPION: title('monthly_champion', '🥇', 'Campeão Mensal', 'Campeão mensal do ranking.', 'champions', {
    type: 'manual',
    value: true,
  }),
  BRAZIL_NUMBER_ONE: title('brazil_number_one', '👑', 'Número 1 do Brasil', 'Topo do ranking nacional.', 'champions', {
    type: 'manual',
    value: true,
  }),

  CROWD_FAVORITE: title('crowd_favorite', '❤️', 'Queridinho da Galera', '50 curtidas recebidas.', 'community', {
    type: 'total_likes',
    value: 50,
  }),
  INFLUENCER: title('influencer', '⭐', 'Influenciador', '500 curtidas recebidas.', 'community', {
    type: 'total_likes',
    value: 500,
  }),
  VETERAN: title('veteran_title', '🎖️', 'Veterano', 'Um ano de FishRank.', 'legendary', {
    type: 'account_age_days',
    value: 365,
  }),
  FISHING_MYTH: title('fishing_myth', '💠', 'Mito da Pesca', '1000 capturas registradas.', 'legendary', {
    type: 'captures',
    value: 1000,
  }),
  WATERS_EMPEROR: title('waters_emperor', '👑', 'Imperador das Águas', '1000 kg somados em capturas.', 'legendary', {
    type: 'total_weight',
    value: 1000,
  }),
  UNSTOPPABLE: title('unstoppable_title', '⚡', 'Imparável', '1000 capturas registradas.', 'legendary', { type: 'captures', value: 1000 }),
  SUPREME_MASTER: title('supreme_master', '🔥', 'Mestre Supremo', '5000 capturas registradas.', 'legendary', {
    type: 'captures',
    value: 5000,
  }),
  UNFORGETTABLE: title('unforgettable', '🏆', 'O Inesquecível', 'Título especial de destaque.', 'legendary', { type: 'manual', value: true }),

  CUMBACA_FISHER: title('cumbaca_fisher', '😂', 'Pescador de Cumbaca', 'Cumbaca registrada no FishRank.', 'humor', {
    type: 'species_count',
    value: 'cumbaca',
    count: 1,
  }),
  CUMBACA_MAGNET: title('cumbaca_magnet', '🐡', 'Ímã de Cumbaca', '10 cumbacas registradas.', 'humor', {
    type: 'species_count',
    value: 'cumbaca',
    count: 10,
  }),
  TANGLED_KING: title('tangled_king', '🌿', 'Rei do Enrosco', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  ROCK_MASTER: title('rock_master', '🪨', 'Mestre das Pedras', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  TREE_FISHER: title('tree_fisher', '🌳', 'Pescador de Árvore', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  OFFICIAL_UNLUCKY: title('official_unlucky', '😅', 'Azarado Oficial', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  FORGOT_BAIT: title('forgot_bait', '🎒', 'Esqueceu a Isca', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  ONLY_PHOTOGRAPHER: title('only_photographer', '🤣', 'Só Fotógrafo', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  SNITCH_KING: title('snitch_king', '😭', 'Rei do Dedo Duro', 'Perdeu muitos peixes.', 'humor', { type: 'manual', value: true }),
  ATE_BAIT: title('ate_bait', '🪝', 'Comeu a Isca', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  DAM_GHOST: title('dam_ghost', '👻', 'Fantasma da Represa', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  NO_LUCK: title('no_luck', '☠️', 'Sem Sorte', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  STORY_MASTER: title('story_master', '🎭', 'Mestre do Caô', 'Título manual de humor.', 'humor', { type: 'manual', value: true }),
  WATER_ALIEN: title('water_alien', '👽', 'Alien das Águas', 'Título secreto.', 'secret', { type: 'manual', value: true }),
  MONSTER_TAMER: title('monster_tamer', '🐉', 'Domador de Monstros', 'Peixe de 20 kg registrado.', 'legendary', {
    type: 'largest_fish',
    value: 20,
  }),
  LEGENDARY_HUNTER: title('legendary_hunter', '⚔️', 'Caçador Lendário', '50 espécies diferentes registradas.', 'legendary', {
    type: 'total_species',
    value: 50,
  }),
  SUPREME_FISHING_GOD: title('supreme_fishing_god', '👑', 'Deus Supremo da Pesca', 'Título secreto extremamente raro.', 'secret', {
    type: 'manual',
    value: true,
  }),
};

export const getTitleById = (titleId) =>
  Object.values(TITLES).find((titleItem) => titleItem.id === titleId) || null;

export const getAllTitles = () => Object.values(TITLES);
