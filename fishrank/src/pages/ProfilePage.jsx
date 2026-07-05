import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiEdit3 } from 'react-icons/fi';
import { Button, EmptyState, Loading, ProfileCard, Toast } from '../components/common';
import { PostCard } from '../components/feed';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/postService';

export const ProfilePage = () => {
  const { user, userProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = postService.listenToUserPosts(
      user.uid,
      (items) => {
        setPosts(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Link to="/titles">
            <Button variant="outline">
              <FiAward />
              Escolher titulo
            </Button>
          </Link>
          <Link to="/profile/edit">
            <Button>
              <FiEdit3 />
              Editar perfil
            </Button>
          </Link>
        </div>

        <ProfileCard user={userProfile} />

        <section>
          <h2 className="mb-4 text-2xl font-black text-primary">Capturas</h2>
          {loading ? (
            <Loading />
          ) : posts.length === 0 ? (
            <EmptyState icon="🎣" title="Sem capturas" message="Suas capturas aparecerao aqui." />
          ) : (
            <div className="mx-auto max-w-3xl space-y-5">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
