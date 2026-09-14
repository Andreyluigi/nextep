import { Link } from 'react-router-dom';
import './MediaCard.css';

export default function MediaCard({ id, title, posterPath, voteAverage }) {
  const imageUrl = posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  const ratingColor = voteAverage >= 7 ? '#10b981' : voteAverage >= 5 ? '#f59e0b' : '#ef4444';

  return (
    <Link to={`/tv/${id}`} className="media-card hover-scale">
      <div className="card-image-wrapper">
        <img src={imageUrl} alt={title} className="card-image" loading="lazy" />
        {voteAverage > 0 && (
          <div className="card-rating" style={{ backgroundColor: ratingColor }}>
            {voteAverage.toFixed(1)}
          </div>
        )}
      </div>
      <h3 className="card-title">{title}</h3>
    </Link>
  );
}