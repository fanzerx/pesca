import { useEffect, useState } from 'react';
import { getTitleById } from '../../constants/titles';
import { commentService } from '../../services/commentService';
import { formatDateWithTime } from '../../utils/helpers';

const Avatar = ({ src, name }) =>
  src ? (
    <img src={src} alt={name || 'Perfil'} className="h-8 w-8 rounded-full object-cover" />
  ) : (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
      {(name || 'U').slice(0, 1).toUpperCase()}
    </div>
  );

export const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = commentService.listenToPostComments(
      postId,
      setComments,
      (err) => setError(err.message)
    );
    return () => unsubscribe();
  }, [postId]);

  if (error) {
    return <p className="text-sm font-semibold text-red-600">{error}</p>;
  }

  if (comments.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-slate-400">Seja o primeiro a comentar esta captura.</p>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const title = getTitleById(comment.equippedTitle);
        return (
          <div key={comment.id} className="flex gap-2">
            <Avatar src={comment.photoURL} name={comment.displayName} />
            <div className="min-w-0 flex-1">
              <div className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-slate-800">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="font-bold text-gray-900 dark:text-white">{comment.displayName || 'Usuario'}</p>
                  <span className="text-xs font-semibold text-accent">{title?.name || 'Pescador Iniciante'}</span>
                </div>
                <p className="whitespace-pre-line text-sm text-gray-700 dark:text-slate-200">{comment.text}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{formatDateWithTime(comment.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
