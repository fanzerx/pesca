import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiMessageCircle, FiSend } from 'react-icons/fi';
import { getTitleById } from '../../constants/titles';
import { useAuth } from '../../context/AuthContext';
import { commentService } from '../../services/commentService';
import { formatDateWithTime, formatLength, formatRelativeTime, formatWeight } from '../../utils/helpers';
import { CommentsList } from './CommentsList';

const Avatar = ({ src, name, size = 'h-11 w-11' }) =>
  src ? (
    <img src={src} alt={name || 'Perfil'} className={`${size} rounded-full object-cover`} />
  ) : (
    <div className={`${size} flex items-center justify-center rounded-full bg-primary font-bold text-white`}>
      {(name || 'U').slice(0, 1).toUpperCase()}
    </div>
  );

export const FeedPostCard = ({ post }) => {
  const { user, userProfile } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const title = useMemo(() => getTitleById(post.equippedTitle), [post.equippedTitle]);
  const profilePath = post.uid === user?.uid ? '/profile' : `/profile/${post.uid}`;
  const hasLocation = post.location || post.city || post.state;
  const isGiant = Number(post.weight || 0) > 10;
  const isTrophy = Number(post.length || 0) > 100;

  const handleComment = async (event) => {
    event.preventDefault();
    const text = commentText.trim();
    if (!text) return;

    try {
      setSubmitting(true);
      setError('');
      await commentService.createComment({
        postId: post.id,
        uid: user.uid,
        displayName: userProfile?.displayName || user.displayName || 'Usuario',
        photoURL: userProfile?.photoURL || user.photoURL || '',
        equippedTitle: userProfile?.equippedTitle || 'fishing_beginner',
        text,
      });
      setCommentText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-md transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <header className="flex items-start gap-3 p-4">
        <Link to={profilePath} className="shrink-0">
          <Avatar src={post.photoURL} name={post.displayName} />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={profilePath} className="font-bold text-gray-950 hover:text-primary dark:text-white dark:hover:text-accent">
            {post.displayName || 'Usuario'}
          </Link>
          <div className="mt-1 inline-flex max-w-full items-center rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-yellow-200 dark:bg-yellow-300/10 dark:text-yellow-200 dark:ring-yellow-300/20">
            <span className="truncate">{title?.name || 'Pescador Iniciante'}</span>
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
            <FiClock />
            <span>{formatRelativeTime(post.createdAt)}</span>
            <span>{formatDateWithTime(post.createdAt)}</span>
          </p>
        </div>
      </header>

      {post.imageURL ? (
        <img src={post.imageURL} alt={post.species || 'Captura'} className="h-80 w-full bg-blue-50 object-cover sm:h-[520px]" />
      ) : (
        <div className="flex h-80 items-center justify-center bg-blue-50 text-6xl dark:bg-slate-800">🎣</div>
      )}

      <div className="space-y-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-black text-primary dark:text-blue-200">{post.species || 'Especie nao informada'}</h2>
            {hasLocation && (
              <p className="mt-1 flex flex-wrap items-center gap-1 text-sm text-gray-600 dark:text-slate-300">
                <FiMapPin className="text-secondary" />
                {[post.location, post.city, post.state].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:min-w-52">
            <div className="rounded-lg bg-light p-3 text-center dark:bg-slate-800">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">Peso</p>
              <p className="font-black text-primary dark:text-blue-200">{formatWeight(post.weight)}</p>
            </div>
            <div className="rounded-lg bg-light p-3 text-center dark:bg-slate-800">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">Comprimento</p>
              <p className="font-black text-primary dark:text-blue-200">{formatLength(post.length)}</p>
            </div>
          </div>
        </div>

        {(isGiant || isTrophy) && (
          <div className="flex flex-wrap gap-2">
            {isGiant && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-primary">🐟 Peixe Gigante</span>}
            {isTrophy && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">📏 Trofeu</span>}
          </div>
        )}

        {post.description && <p className="whitespace-pre-line text-gray-700 dark:text-slate-200">{post.description}</p>}

        <div className="flex items-center justify-between border-y border-gray-100 py-3 text-sm font-semibold text-gray-600 dark:border-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-2">
            <FiMessageCircle />
            {post.commentsCount || 0} comentarios
          </span>
        </div>

        <CommentsList postId={post.id} />

        <form onSubmit={handleComment} className="flex items-center gap-2">
          <Avatar src={userProfile?.photoURL} name={userProfile?.displayName} size="h-9 w-9" />
          <input
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Comente sobre a captura..."
            className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            disabled={submitting || !commentText.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            title="Enviar comentario"
          >
            <FiSend />
          </button>
        </form>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      </div>
    </article>
  );
};
