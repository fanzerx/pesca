import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState, Loading, ProfileCard, Toast } from '../components/common';
import { FeedPostCard } from '../components/feed';
import { getAchievementById } from '../constants/achievements';
import { getTitleById } from '../constants/titles';
import { userService } from '../services/userService';
import { postService } from '../services/postService';

const ProfileBadges = ({ profile }) => {
  const achievements = (profile?.unlockedAchievements || []).map(getAchievementById).filter(Boolean);
  const titles = (profile?.unlockedTitles || []).map(getTitleById).filter(Boolean);

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-900">
        <h2 className="text-lg font-black text-primary dark:text-blue-200">Conquistas</h2>
        {achievements.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">Nenhuma conquista desbloqueada ainda.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <span key={achievement.id} className="rounded-full bg-light px-3 py-1 text-sm font-bold text-primary dark:bg-slate-800 dark:text-blue-200">
                {achievement.icon} {achievement.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-900">
        <h2 className="text-lg font-black text-primary dark:text-blue-200">Titulos</h2>
        {titles.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">Nenhum titulo desbloqueado ainda.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {titles.map((title) => (
              <span key={title.id} className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-bold text-primary ring-1 ring-yellow-200 dark:bg-yellow-300/10 dark:text-yellow-200 dark:ring-yellow-300/20">
                {title.icon} {title.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const SocialProfilePage = () => {
  const { uid } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsubscribe = null;

    const load = async () => {
      try {
        setLoading(true);
        const userProfile = await userService.getUserProfile(uid);
        setProfile(userProfile);
        unsubscribe = postService.listenToUserPosts(
          uid,
          (items) => {
            setPosts(items);
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    load();
    return () => unsubscribe?.();
  }, [uid]);

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-6">
        {loading && !profile ? (
          <Loading />
        ) : !profile ? (
          <EmptyState icon="🎣" title="Perfil nao encontrado" message="Este pescador nao esta disponivel." />
        ) : (
          <>
            <ProfileCard user={profile} />
            <ProfileBadges profile={profile} />

            <section>
              <h2 className="mb-4 text-2xl font-black text-primary dark:text-blue-200">Capturas</h2>
              {loading ? (
                <Loading />
              ) : posts.length === 0 ? (
                <EmptyState icon="🎣" title="Sem capturas" message="As capturas deste pescador aparecerao aqui." />
              ) : (
                <div className="mx-auto max-w-3xl space-y-5">
                  {posts.map((post) => (
                    <FeedPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
