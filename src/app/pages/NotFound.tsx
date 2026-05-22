import { Link } from 'react-router';
import { Button } from '../components/Button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-6">404</h1>
        <h2 className="mb-8">Страница не найдена</h2>
        <Link to="/">
          <Button variant="primary">Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
}
