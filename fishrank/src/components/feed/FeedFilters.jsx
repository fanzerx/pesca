import { FiSearch } from 'react-icons/fi';

const filters = [
  ['all', 'Todos'],
  ['today', 'Hoje'],
  ['week', 'Esta semana'],
  ['month', 'Este mes'],
  ['heaviest', 'Maior peso'],
  ['longest', 'Maior comprimento'],
  ['newest', 'Mais recentes'],
  ['oldest', 'Mais antigos'],
];

export const FeedFilters = ({ search, onSearchChange, activeFilter, onFilterChange }) => (
  <section className="sticky top-0 z-20 -mx-4 border-b border-blue-100 bg-light/95 px-4 py-4 backdrop-blur md:top-0 md:mx-0 md:rounded-lg md:border md:bg-white md:shadow-sm dark:border-slate-700 dark:bg-slate-900/95">
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Pesquisar por pescador, especie, cidade ou estado"
        className="w-full rounded-full border border-blue-100 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {filters.map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onFilterChange(value)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
            activeFilter === value
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-gray-600 ring-1 ring-blue-100 hover:text-primary dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  </section>
);
