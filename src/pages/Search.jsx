import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import './Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=pt-BR&query=${query}`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <section className="search-container fade-in">
      <h1 className="title-premium">
        Resultados para: <span className="query-highlight">"{query}"</span>
      </h1>
      
      {loading ? (
        <div className="loading-state">Buscando séries...</div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          Nenhuma série encontrada. Tente outro termo!
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