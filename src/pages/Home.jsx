import { useState, useEffect } from 'react';
import MediaCard from '../components/MediaCard';
import './Home.css';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        setTrending(data.results);
      } catch (error) {
        console.error("Erro ao buscar séries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="home-container">
      <h1 className="title-premium">Séries em Alta</h1>
      
      {loading ? (
        <div className="loading-state">Carregando lançamentos...</div>
      ) : (
        <div className="grid-container">
          {trending.map((show) => (
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