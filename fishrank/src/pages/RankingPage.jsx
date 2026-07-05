import { useEffect, useState } from 'react';
import { RankingCard, Loading, Toast } from '../components/common';
import { rankingService } from '../services/rankingService';

const tabs = [
  { id: 'captures', label: 'Peixes' },
  { id: 'weight', label: 'Peso total' },
  { id: 'largest', label: 'Maior peixe' },
  { id: 'species', label: 'Especies' },
  { id: 'medals', label: 'Medalhas' },
];

export const RankingPage = () => {
  const [active, setActive] = useState('captures');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setUsers(await rankingService.getRanking(active));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [active]);

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-primary">Ranking</h1>
          <p className="text-sm text-gray-600">Compare resultados por quantidade, peso, especies e medalhas.</p>
        </header>
        <div className="mb-5 flex gap-2 overflow-x-auto rounded-lg bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition ${
                active === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="space-y-3">
            {users.map((user, index) => (
              <RankingCard key={user.uid || user.id} rank={index + 1} user={user} type={active} />
            ))}
          </div>
        )}
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
