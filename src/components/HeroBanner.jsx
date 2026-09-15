import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HeroBanner.css';

export default function HeroBanner({ shows = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (shows.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.min(shows.length, 5));
    }, 6000);

    return () => clearInterval(interval);
  }, [shows]);

  if (shows.length === 0) return null;

  const currentShow = shows[currentIndex];
  const backdropUrl = currentShow.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${currentShow.backdrop_path}` 
    : '';

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.min(shows.length, 5) - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.min(shows.length, 5));
  };

  return (
    <div className="hero-banner fade-in" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <span className="hero-badge">Destaque da Semana</span>
        <h1 className="hero-title">{currentShow.name}</h1>
        <p className="hero-overview">{currentShow.overview || "Explore os detalhes desta superprodução."}</p>
        
        <div className="hero-actions">
          <Link to={`/tv/${currentShow.id}`} className="hero-btn-primary">
            <FiPlay /> Assistir / Episódios
          </Link>
        </div>
      </div>

      <div className="hero-controls">
        <button onClick={handlePrev} className="hero-arrow-btn"><FiChevronLeft /></button>
        <button onClick={handleNext} className="hero-arrow-btn"><FiChevronRight /></button>
      </div>
    </div>
  );
}