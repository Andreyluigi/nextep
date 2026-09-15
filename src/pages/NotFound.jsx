import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-container fade-in">
      <h1 className="error-code">404</h1>
      <h2>Página não encontrada</h2>
      <p>Parece que essa série foi cancelada ou a rota não existe.</p>
      <Link to="/" className="back-home-btn">
        Voltar para a Home
      </Link>
    </div>
  );
}