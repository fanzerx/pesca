import { AchievementCard } from '../components/common';
import { ACHIEVEMENT_CATEGORIES, getAllAchievements } from '../constants/achievements';
import { useAuth } from '../context/AuthContext';

export const AchievementsPage = () => {
  const { userProfile } = useAuth();
  const unlocked = userProfile?.unlockedAchievements || [];

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-primary">Conquistas</h1>
          <p className="text-sm text-gray-600">{unlocked.length} medalhas desbloqueadas.</p>
        </header>
        <div className="space-y-8">
          {ACHIEVEMENT_CATEGORIES.map((category) => {
            const achievements = getAllAchievements().filter((achievement) => achievement.category === category);
            return (
              <section key={category}>
                <h2 className="mb-3 text-xl font-black capitalize text-primary">{category}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} unlocked={unlocked.includes(achievement.id)} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
};
