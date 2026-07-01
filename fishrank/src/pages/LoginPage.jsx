import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Toast } from '../components/common';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      setSuccess('Login realizado com sucesso!');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await loginWithGoogle();
      setSuccess('Login com Google realizado com sucesso!');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🎣</h1>
          <h2 className="text-3xl font-bold text-white">FishRank</h2>
          <p className="text-accent mt-2">Comunidade de Pescadores</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Bem-vindo!</h3>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="full"
              loading={loading}
              disabled={loading}
            >
              Entrar
            </Button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            size="full"
            disabled={loading}
          >
            <span>🔵</span>
            Entrar com Google
          </Button>

          {/* Link para Cadastro */}
          <p className="text-center text-gray-600 mt-6">
            Não tem conta?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Criar conta
            </Link>
          </p>

          {/* Link para Recuperar Senha */}
          <p className="text-center text-gray-600 mt-2">
            <Link to="/reset-password" className="text-secondary font-semibold hover:underline text-sm">
              Esqueceu a senha?
            </Link>
          </p>
        </div>

        {/* Rodapé */}
        <p className="text-center text-white mt-8 text-sm">
          © 2024 FishRank. Todos os direitos reservados.
        </p>
      </div>

      {/* Toasts */}
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
      {success && <Toast message={success} type="success" onClose={() => setSuccess('')} />}
    </div>
  );
};
