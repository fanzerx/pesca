import { useState } from 'react';
import { TitleCard, Toast } from '../components/common';
import { getAllTitles, TITLE_CATEGORIES } from '../constants/titles';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';

export const TitlesPage = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [error, setError] = useState('');
  const unlocked = userProfile?.unlockedTitles || ['fishing_beginner'];
  const equipped = userProfile?.equippedTitle || userProfile?.equipedTitle || 'fishing_beginner';

  const equip = async (titleId) => {
    try {
      await userService.equipTitle(user.uid, titleId);
      await updateProfile({ equippedTitle: titleId });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-primary">Escolher Título</h1>
          <p className="text-sm text-gray-600">Apenas um título fica equipado por vez.</p>
        </header>
        <div className="space-y-8">
          {Object.entries(TITLE_CATEGORIES).map(([type, label]) => {
            const titles = getAllTitles().filter((title) => title.type === type);
            return (
              <section key={type}>
                <h2 className="mb-3 text-xl font-black text-primary">{label}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {titles.map((title) => (
                    <TitleCard
                      key={title.id}
                      title={title}
                      unlocked={unlocked.includes(title.id)}
                      equipped={equipped === title.id}
                      onEquip={() => equip(title.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
