import { FiCalendar, FiHeart, FiMapPin, FiNavigation, FiShare2 } from 'react-icons/fi';
import { getTitleById } from '../../constants/titles';
import { formatDate, formatLength, formatWeight } from '../../utils/helpers';

export const CaptureCard = ({ capture, userProfile, onLike, liked = false }) => {
  if (!capture) return null;

  const title = getTitleById(userProfile?.equippedTitle || userProfile?.equipedTitle);

  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      <header className="flex items-center gap-3 border-b border-gray-100 p-4">
        {userProfile?.photoURL ? (
          <img src={userProfile.photoURL} alt={userProfile.displayName || 'Perfil'} className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white">
            {(userProfile?.displayName || 'U').slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-bold text-gray-900">{userProfile?.displayName || 'Usuário'}</h3>
          <p className="truncate text-xs font-semibold text-accent">{title?.name || 'Pescador Iniciante'}</p>
        </div>
      </header>

      {capture.photoURL ? (
        <img src={capture.photoURL} alt={capture.fishName} className="h-80 w-full object-cover sm:h-[480px]" />
      ) : (
        <div className="flex h-72 items-center justify-center bg-blue-50 text-6xl">🎣</div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-primary">{capture.fishName}</h2>
            <p className="text-sm text-gray-600">{capture.species || 'Espécie não informada'}</p>
          </div>
          <div className="rounded-lg bg-light px-3 py-2 text-right">
            <p className="text-sm font-black text-primary">{formatWeight(capture.weight)}</p>
            <p className="text-xs text-gray-500">{formatLength(capture.length)}</p>
          </div>
        </div>

        {capture.description && <p className="mt-3 text-gray-700">{capture.description}</p>}

        <div className="mt-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-3">
          <span className="flex items-center gap-2">
            <FiMapPin className="text-secondary" /> {capture.city}
          </span>
          <span className="flex items-center gap-2">
            <FiNavigation className="text-secondary" /> {capture.location}
          </span>
          <span className="flex items-center gap-2">
            <FiCalendar className="text-secondary" /> {formatDate(capture.createdAt)}
          </span>
        </div>
      </div>

      <footer className="flex items-center gap-4 border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onLike}
          className={`flex items-center gap-2 font-semibold transition ${
            liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <FiHeart fill={liked ? 'currentColor' : 'none'} />
          {capture.likes || 0}
        </button>
        <button type="button" className="flex items-center gap-2 font-semibold text-gray-600 transition hover:text-secondary">
          <FiShare2 />
          Compartilhar
        </button>
      </footer>
    </article>
  );
};
