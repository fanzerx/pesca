import { FiAward, FiCheck, FiLock, FiMapPin } from 'react-icons/fi';
import { ACHIEVEMENT_CATEGORY_LABELS } from '../../constants/achievements';
import { getTitleById, TITLE_CATEGORIES } from '../../constants/titles';

const avatar = (user, size = 'h-12 w-12') =>
  user?.photoURL ? (
    <img src={user.photoURL} alt={user.displayName || 'Perfil'} className={`${size} rounded-full object-cover`} />
  ) : (
    <div className={`${size} rounded-full bg-primary text-white flex items-center justify-center font-bold`}>
      {(user?.displayName || 'U').slice(0, 1).toUpperCase()}
    </div>
  );

const formatUnlockedAt = (value) => {
  if (!value) return 'Ainda não desbloqueada';
  const date = value?.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return 'Data indisponível';
  return date.toLocaleDateString('pt-BR');
};

export const AchievementCard = ({ achievement, unlocked = false, unlockedAt = null }) => {
  const category = ACHIEVEMENT_CATEGORY_LABELS[achievement.category] || achievement.category;

  return (
    <article
      className={`rounded-lg border p-4 transition hover:-translate-y-0.5 ${
        unlocked
          ? 'border-accent/70 bg-white shadow-md'
          : 'border-gray-200 bg-gray-100 text-gray-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-3xl ${unlocked ? '' : 'grayscale'}`}>{achievement.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-gray-900">{achievement.name}</h3>
            {unlocked ? <FiCheck className="shrink-0 text-green-600" /> : <FiLock className="shrink-0 text-gray-400" />}
          </div>
          <p className="mt-1 text-sm text-gray-600">{achievement.description}</p>
          <dl className="mt-3 space-y-1 text-xs">
            <div>
              <dt className="font-semibold text-gray-500">Categoria</dt>
              <dd className="text-gray-700">{category}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500">Condição</dt>
              <dd className="text-gray-700">{achievement.condition}</dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div>
                <dt className="font-semibold text-gray-500">Status</dt>
                <dd className={unlocked ? 'font-semibold text-green-700' : 'font-semibold text-gray-500'}>
                  {unlocked ? 'Desbloqueada' : 'Bloqueada'}
                </dd>
              </div>
              <div className="text-right">
                <dt className="font-semibold text-gray-500">Desbloqueio</dt>
                <dd className="text-gray-700">{formatUnlockedAt(unlockedAt)}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
};

export const TitleCard = ({ title, unlocked = false, equipped = false, onEquip = null }) => (
  <article
    className={`rounded-lg border p-4 transition ${
      equipped
        ? 'border-accent bg-yellow-50 shadow-md'
        : unlocked
          ? 'border-blue-100 bg-white hover:border-secondary hover:shadow-md'
          : 'border-gray-200 bg-gray-100 text-gray-500'
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className={`text-3xl ${unlocked ? '' : 'grayscale'}`}>{title.icon}</div>
      {equipped && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">Equipado</span>}
    </div>
    <h3 className="mt-3 font-bold text-gray-900">{title.name}</h3>
    <p className="mt-1 text-sm text-gray-600">{title.description}</p>
    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-secondary">
      {TITLE_CATEGORIES[title.type] || title.type}
    </p>
    {unlocked && !equipped && (
      <button
        type="button"
        onClick={onEquip}
        className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary"
      >
        Equipar
      </button>
    )}
    {!unlocked && <p className="mt-4 text-xs font-medium text-gray-500">Bloqueado</p>}
  </article>
);

export const RankingCard = ({ rank, user, type = 'captures' }) => {
  const title = getTitleById(user.equippedTitle || user.equipedTitle);
  const values = {
    captures: `${user.totalCaptures || 0} peixes`,
    weight: `${Number(user.totalWeight || 0).toFixed(1)} kg`,
    largest: `${Number(user.largestFish || 0).toFixed(1)} kg`,
    species: `${user.totalSpecies || 0} espécies`,
    medals: `${(user.unlockedAchievements || []).length} medalhas`,
  };

  return (
    <article className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="w-10 text-center text-xl font-black text-primary">{rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}</div>
      {avatar(user)}
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold text-gray-900">{user.displayName || 'Usuário'}</h3>
        <p className="truncate text-sm font-semibold text-accent">{title?.name || 'Pescador Iniciante'}</p>
      </div>
      <strong className="text-right text-primary">{values[type]}</strong>
    </article>
  );
};

export const ProfileCard = ({ user }) => {
  const title = getTitleById(user?.equippedTitle || user?.equipedTitle);
  const stats = [
    ['Medalhas', (user?.unlockedAchievements || []).length],
    ['Peixes', user?.totalCaptures || 0],
    ['Peso total', `${Number(user?.totalWeight || 0).toFixed(1)} kg`],
    ['Maior peixe', `${Number(user?.largestFish || 0).toFixed(1)} kg`],
    ['Espécies', user?.totalSpecies || 0],
  ];

  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="h-28 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="px-5 pb-6">
        <div className="-mt-12 flex flex-col items-center text-center">
          {avatar(user, 'h-24 w-24 border-4 border-white')}
          <h2 className="mt-3 text-2xl font-black text-gray-900">{user?.displayName || 'Usuário'}</h2>
          <p className="font-semibold text-accent">{title?.name || 'Pescador Iniciante'}</p>
          {user?.city && (
            <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <FiMapPin /> {user.city}
            </p>
          )}
          {user?.bio && <p className="mt-4 max-w-xl text-sm text-gray-600">{user.bio}</p>}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-light p-3 text-center">
              <p className="font-black text-primary">{value}</p>
              <p className="text-xs text-gray-600">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-yellow-50 p-3 text-sm font-semibold text-primary">
          <FiAward className="text-accent" />
          {(user?.unlockedTitles || []).length} títulos desbloqueados
        </div>
      </div>
    </article>
  );
};
