import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiEdit3 } from 'react-icons/fi';
import { Button, CaptureCard, EmptyState, Loading, ProfileCard, Toast } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { captureService } from '../services/captureService';

export const ProfilePage = () => {
  const { user, userProfile } = useAuth();
  const [captures, setCaptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setCaptures(await captureService.getUserCaptures(user.uid));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user.uid]);

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Link to="/titles">
            <Button variant="outline">
              <FiAward />
              Escolher título
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
          ) : captures.length === 0 ? (
            <EmptyState icon="🎣" title="Sem capturas" message="Suas capturas aparecerão aqui." />
          ) : (
            <div className="space-y-5">
              {captures.map((capture) => (
                <CaptureCard key={capture.id} capture={capture} userProfile={userProfile} />
              ))}
            </div>
          )}
        </section>
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
