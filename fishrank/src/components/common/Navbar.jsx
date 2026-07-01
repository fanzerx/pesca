import { NavLink, useNavigate } from 'react-router-dom';
import { FiAward, FiHome, FiLogOut, FiPlus, FiTrendingUp, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const items = [
  { icon: FiHome, label: 'Home', path: '/home' },
  { icon: FiPlus, label: 'Nova', path: '/new-capture' },
  { icon: FiTrendingUp, label: 'Ranking', path: '/ranking' },
  { icon: FiAward, label: 'Conquistas', path: '/achievements' },
  { icon: FiUser, label: 'Perfil', path: '/profile' },
];

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
    isActive ? 'bg-white text-primary shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'
  }`;

export const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-primary p-5 text-white md:flex">
        <div className="mb-8">
          <p className="text-2xl font-black text-accent">🎣 FishRank</p>
          <p className="text-sm text-white/70">Ranking de pescadores</p>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {items.map(({ icon: Icon, label, path }) => (
            <NavLink key={path} to={path} className={navClass}>
              <Icon size={20} />
              {label === 'Nova' ? 'Nova Captura' : label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <FiLogOut size={20} />
          Sair
        </button>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-blue-100 bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {items.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`
              }
            >
              <Icon size={21} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};
