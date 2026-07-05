import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Button, EmptyState, Loading, Toast } from '../components/common';
import { PostCard } from '../components/feed';
import { feedService } from '../services/feedService';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = feedService.listenToFeed(
      (items) => {
        setPosts(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      30
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-primary">Ultimas capturas</h1>
            <p className="text-sm text-gray-600">O feed da comunidade FishRank.</p>
          </div>
          <Button onClick={() => navigate('/new-capture')} size="md">
            <FiPlus />
            Nova
          </Button>
        </header>

        {loading ? (
          <Loading />
        ) : posts.length === 0 ? (
          <EmptyState
            icon="🎣"
            title="Nenhuma captura ainda"
            message="Registre a primeira captura da comunidade."
            action={<Button onClick={() => navigate('/new-capture')}>Registrar captura</Button>}
          />
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
