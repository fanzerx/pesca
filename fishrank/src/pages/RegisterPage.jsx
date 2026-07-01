import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Toast } from '../components/common';
import { isValidEmail } from '../utils/helpers';

export const RegisterPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const validateForm = () => {
    if (!displayName.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Email inválido');
      return false;
    }
    if (password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      await register(email, password, displayName);
      setSuccess('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      if (err.message.includes('email-already-in-use')) {
        setError('Este email já está registrado');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await loginWithGoogle();
      setSuccess('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2">🎣</h1>
          <h2 className="text-3xl font-bold text-white">FishRank</h2>
          <p className="text-accent mt-2">Junte-se à comunidade</p>
        </div>

        {/* Card de Registro */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Criar Conta</h3>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
            />

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
              helperText="Mínimo 6 caracteres"
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="full"
              loading={loading}
              disabled={loading}
            >
              Criar Conta
            </Button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Register */}
          <Button
            onClick={handleGoogleRegister}
            variant="outline"
            size="full"
            disabled={loading}
          >
            <span>🔵</span>
            Registrar com Google
          </Button>

          {/* Link para Login */}
          <p className="text-center text-gray-600 mt-6">
            Já tem conta?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Fazer login
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
