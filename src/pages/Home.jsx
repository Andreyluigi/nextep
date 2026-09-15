import { useState, useEffect } from 'react';
import MediaCard from '../components/MediaCard';
import HeroBanner from '../components/HeroBanner';
import './Home.css';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "NextEp | Suas séries favoritas";

    const fetchTrending = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        setTrending(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar séries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const featuredShow = trending.length > 0 ? trending[0] : null;
  const gridShows = trending.slice(1);

  return (
    <section className="home-container">
      {loading ? (
        <div className="loading-state">Carregando lançamentos...</div>
      ) : (
        <>
          <HeroBanner shows={trending} />
          <h1 className="title-premium">Séries em Alta</h1>
          <div className="grid-container">
            {gridShows.map((show) => (
              <MediaCard 
                key={show.id}
                id={show.id}
                title={show.name}
                posterPath={show.poster_path}
                voteAverage={show.vote_average}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}