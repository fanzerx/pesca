import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar, Loading } from './components/common';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AchievementsPage } from './pages/AchievementsPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NewCapturePage } from './pages/NewCapturePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { RankingPage } from './pages/RankingPage';
import { RegisterPage } from './pages/RegisterPage';
import { TitlesPage } from './pages/TitlesPage';

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-light">
        <Loading />
      </main>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppShell = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function AppRoutes() {
  const protectedPage = (page) => (
    <ProtectedRoute>
      <AppShell>{page}</AppShell>
    </ProtectedRoute>
  );

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={protectedPage(<HomePage />)} />
      <Route path="/new-capture" element={protectedPage(<NewCapturePage />)} />
      <Route path="/ranking" element={protectedPage(<RankingPage />)} />
      <Route path="/achievements" element={protectedPage(<AchievementsPage />)} />
      <Route path="/profile" element={protectedPage(<ProfilePage />)} />
      <Route path="/profile/edit" element={protectedPage(<EditProfilePage />)} />
      <Route path="/titles" element={protectedPage(<TitlesPage />)} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
