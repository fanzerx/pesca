import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Button, CaptureCard, EmptyState, Loading, Toast } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { captureService } from '../services/captureService';
import { userService } from '../services/userService';

export const HomePage = () => {
  const [captures, setCaptures] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [likedCaptures, setLikedCaptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const latest = await captureService.getLatestCaptures(30);
        const uniqueUids = [...new Set(latest.map((capture) => capture.uid))];
        const loadedProfiles = {};
        await Promise.all(
          uniqueUids.map(async (uid) => {
            loadedProfiles[uid] = await userService.getUserProfile(uid);
          }),
        );
        setCaptures(latest);
        setProfiles(loadedProfiles);
        setLikedCaptures(userProfile?.likes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userProfile?.likes]);

  const handleLike = async (captureId) => {
    try {
      const liked = likedCaptures.includes(captureId);
      if (liked) {
        await userService.removeLike(user.uid, captureId);
        await captureService.decrementLikes(captureId);
        setLikedCaptures((current) => current.filter((id) => id !== captureId));
        setCaptures((current) =>
          current.map((capture) =>
            capture.id === captureId ? { ...capture, likes: Math.max((capture.likes || 1) - 1, 0) } : capture,
          ),
        );
      } else {
        await userService.addLike(user.uid, captureId);
        await captureService.incrementLikes(captureId);
        setLikedCaptures((current) => [...current, captureId]);
        setCaptures((current) =>
          current.map((capture) => (capture.id === captureId ? { ...capture, likes: (capture.likes || 0) + 1 } : capture)),
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-primary">Últimas capturas</h1>
            <p className="text-sm text-gray-600">O feed da comunidade FishRank.</p>
          </div>
          <Button onClick={() => navigate('/new-capture')} size="md">
            <FiPlus />
            Nova
          </Button>
        </header>

        {loading ? (
          <Loading />
        ) : captures.length === 0 ? (
          <EmptyState
            icon="🎣"
            title="Nenhuma captura ainda"
            message="Registre a primeira captura da comunidade."
            action={<Button onClick={() => navigate('/new-capture')}>Registrar captura</Button>}
          />
        ) : (
          <div className="space-y-5">
            {captures.map((capture) => (
              <CaptureCard
                key={capture.id}
                capture={capture}
                userProfile={profiles[capture.uid]}
                liked={likedCaptures.includes(capture.id)}
                onLike={() => handleLike(capture.id)}
              />
            ))}
          </div>
        )}
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
