import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import './Search.css';

const GENRES = [
  { id: '', name: 'Todos' },
  { id: '10759', name: 'Ação e Aventura' },
  { id: '18', name: 'Drama' },
  { id: '35', name: 'Comédia' },
  { id: '10765', name: 'Ficção Científica e Fantasia' },
  { id: '9648', name: 'Mistério' },
  { id: '80', name: 'Crime' }
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    document.title = "Busca | NextEp";
    
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        let url = '';

        if (query.trim()) {
          url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}`;
        } else {
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        let shows = data.results || [];

        if (selectedGenre) {
          shows = shows.filter(show => show.genre_ids && show.genre_ids.includes(Number(selectedGenre)));
        }

        setResults(shows);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, selectedGenre]);

  return (
    <section className="search-container fade-in">
      <h1 className="title-premium">
        {query ? <>Resultados para: <span className="query-highlight">"{query}"</span></> : "Explorar Séries"}
      </h1>

      <div className="genre-filter-container">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            className={`genre-pill ${selectedGenre === genre.id ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="loading-state">Buscando séries...</div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          Nenhuma série encontrada com esses filtros.
        </div>
      ) : (
        <div className="grid-container">
          {results.map((show) => (
            <MediaCard 
              key={show.id}
              id={show.id}
              title={show.name}
              posterPath={show.poster_path}
              voteAverage={show.vote_average}
            />
          ))}
        </div>
      )}
    </section>
  );
}