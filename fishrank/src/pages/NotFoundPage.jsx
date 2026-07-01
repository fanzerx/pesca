import { Link } from 'react-router-dom';
import { Button } from '../components/common';

export const NotFoundPage = () => (
  <main className="flex min-h-screen items-center justify-center bg-light px-4">
    <div className="max-w-md text-center">
      <p className="text-6xl">🎣</p>
      <h1 className="mt-4 text-4xl font-black text-primary">Página não encontrada</h1>
      <p className="mt-2 text-gray-600">Essa rota saiu da linha.</p>
      <Link to="/home" className="mt-6 inline-flex">
        <Button>Voltar para Home</Button>
      </Link>
    </div>
  </main>
);
