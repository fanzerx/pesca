import { useEffect, useMemo, useState } from 'react';
import { EmptyState, Loading, Toast } from '../components/common';
import { FeedFilters, PostCard } from '../components/feed';
import { postService } from '../services/postService';

const toDate = (value) => {
  if (!value) return null;
  if (value.toDate) return value.toDate();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfDay = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const startOfWeek = () => {
  const date = startOfDay();
  date.setDate(date.getDate() - date.getDay());
  return date;
};

const startOfMonth = () => new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('newest');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = postService.listenToPosts(
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
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    let items = [...posts];

    if (normalizedSearch) {
      items = items.filter((post) =>
        [post.displayName, post.species, post.city, post.state]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch))
      );
    }

    if (activeFilter === 'today') {
      const start = startOfDay();
      items = items.filter((post) => {
        const date = toDate(post.createdAt);
        return date && date >= start;
      });
    }

    if (activeFilter === 'week') {
      const start = startOfWeek();
      items = items.filter((post) => {
        const date = toDate(post.createdAt);
        return date && date >= start;
      });
    }

    if (activeFilter === 'month') {
      const start = startOfMonth();
      items = items.filter((post) => {
        const date = toDate(post.createdAt);
        return date && date >= start;
      });
    }

    const sorters = {
      all: (a, b) => (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0),
      newest: (a, b) => (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0),
      oldest: (a, b) => (toDate(a.createdAt)?.getTime() || 0) - (toDate(b.createdAt)?.getTime() || 0),
      heaviest: (a, b) => Number(b.weight || 0) - Number(a.weight || 0),
      longest: (a, b) => Number(b.length || 0) - Number(a.length || 0),
    };

    return items.sort(sorters[activeFilter] || sorters.newest);
  }, [activeFilter, posts, search]);

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl space-y-5">
        <header>
          <h1 className="text-3xl font-black text-primary dark:text-blue-200">Feed</h1>
          <p className="text-sm text-gray-600 dark:text-slate-400">As capturas mais recentes da comunidade FishRank.</p>
        </header>

        <FeedFilters
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {loading ? (
          <Loading />
        ) : filteredPosts.length === 0 ? (
          <EmptyState icon="🎣" title="Nenhuma captura encontrada" message="Quando alguem registrar uma captura, ela aparecera aqui." />
        ) : (
          <div className="space-y-5">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
