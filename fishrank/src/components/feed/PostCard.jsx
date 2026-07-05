import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiEdit2, FiMapPin, FiMessageCircle, FiSend, FiTrash2 } from 'react-icons/fi';
import { Button, Input, Modal, Textarea } from '../common';
import { STATES } from '../../constants';
import { getTitleById } from '../../constants/titles';
import { useAuth } from '../../context/AuthContext';
import { commentService } from '../../services/commentService';
import { postService } from '../../services/postService';
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

export const PostCard = ({ post }) => {
  const { user, userProfile } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [editData, setEditData] = useState({
    description: post.description || '',
    location: post.location || '',
    city: post.city || '',
    state: post.state || '',
  });
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const title = useMemo(() => getTitleById(post.equippedTitle), [post.equippedTitle]);
  const profilePath = post.uid === user?.uid ? '/profile' : `/profile/${post.uid}`;
  const isOwner = post.uid === user?.uid;
  const hasLocation = post.location || post.city || post.state;
  const isGiant = Number(post.weight || 0) > 10;
  const isTrophy = Number(post.length || 0) > 100;

  const updateEditField = (event) => {
    const { name, value } = event.target;
    setEditData((current) => ({ ...current, [name]: value }));
  };

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

  const openEdit = () => {
    setEditData({
      description: post.description || '',
      location: post.location || '',
      city: post.city || '',
      state: post.state || '',
    });
    setEditing(true);
    setError('');
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await postService.updatePost(post.id, editData);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError('');
      await postService.deletePost(post.id);
      setConfirmDelete(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
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
        {isOwner && (
          <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row">
            <button
              type="button"
              onClick={openEdit}
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-gray-600 transition hover:bg-blue-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800"
              title="Editar publicacao"
            >
              <FiEdit2 />
              <span>Editar</span>
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-slate-800"
              title="Excluir publicacao"
            >
              <FiTrash2 />
              <span>Excluir</span>
            </button>
          </div>
        )}
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

      <Modal
        isOpen={editing}
        onClose={() => setEditing(false)}
        title="Editar publicacao"
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => setEditing(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="submit" form={`edit-post-${post.id}`} loading={submitting}>
              Salvar
            </Button>
          </>
        }
      >
        <form id={`edit-post-${post.id}`} onSubmit={handleEdit} className="space-y-4">
          <Textarea
            label="Descricao"
            name="description"
            value={editData.description}
            onChange={updateEditField}
            placeholder="Conte os detalhes da captura."
          />
          <Input label="Local" name="location" value={editData.location} onChange={updateEditField} />
          <Input label="Cidade" name="city" value={editData.city} onChange={updateEditField} />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Estado</label>
            <select
              name="state"
              value={editData.state}
              onChange={updateEditField}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Selecione uma opcao</option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500">Imagem, especie, peso e comprimento nao podem ser alterados.</p>
        </form>
      </Modal>

      <Modal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Excluir publicacao"
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => setConfirmDelete(false)} disabled={deleting}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleDelete} loading={deleting}>
              Excluir
            </Button>
          </>
        }
      >
        <p className="text-gray-700">Tem certeza que deseja excluir esta publicação?</p>
      </Modal>
    </article>
  );
};
