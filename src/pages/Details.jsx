import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeItem from '../components/EpisodeItem';
import './Details.css';

export default function Details() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem('nextep_watched');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nextep_watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const showRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`);
        const showData = await showRes.json();
        setShow(showData);
        
        const firstSeason = showData.seasons.find(s => s.season_number > 0)?.season_number || 1;
        setSelectedSeason(firstSeason);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShow();
  }, [id]);

  useEffect(() => {
    if (!show) return;
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const epRes = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${apiKey}&language=pt-BR`);
        const epData = await epRes.json();
        setEpisodes(epData.episodes || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [id, selectedSeason, show]);

  const toggleEpisode = (episodeId) => {
    setWatched((prev) => 
      prev.includes(episodeId)
        ? prev.filter((epId) => epId !== episodeId)
        : [...prev, episodeId]
    );
  };

  if (!show) return <div className="loading-state">Carregando...</div>;

  const backdropUrl = show.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}` 
    : '';

  const validSeasons = show.seasons.filter(s => s.season_number > 0);

  return (
    <div className="details-container fade-in">
      {backdropUrl && (
        <div className="backdrop-banner" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className="backdrop-overlay"></div>
        </div>
      )}

      <div className="details-content">
        <div className="details-header">
          <img 
            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} 
            alt={show.name} 
            className="details-poster" 
          />
          <div className="details-info">
            <h1 className="title-premium">{show.name}</h1>
            <div className="tags">
              <span className="tag-highlight">⭐ {show.vote_average.toFixed(1)}</span>
              {show.genres.map(g => <span key={g.id} className="tag">{g.name}</span>)}
            </div>
            <p className="overview">{show.overview || "Sinopse não disponível."}</p>
          </div>
        </div>

        <div className="episodes-section">
          <div className="season-selector">
            {validSeasons.map((season) => (
              <button 
                key={season.id} 
                className={`season-btn ${selectedSeason === season.season_number ? 'active' : ''}`}
                onClick={() => setSelectedSeason(season.season_number)}
              >
                Temporada {season.season_number}
              </button>
            ))}
          </div>

          <div className="episodes-list">
            {loading ? (
              <p className="loading-episodes">Buscando episódios...</p>
            ) : (
              episodes.map((ep) => (
                <EpisodeItem 
                  key={ep.id}
                  id={ep.id}
                  name={ep.name}
                  episodeNumber={ep.episode_number}
                  isWatched={watched.includes(ep.id)}
                  onToggle={toggleEpisode}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}