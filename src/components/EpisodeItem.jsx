import { FiCheck } from 'react-icons/fi';
import './EpisodeItem.css';

export default function EpisodeItem({ id, name, episodeNumber, isWatched, onToggle }) {
  return (
    <div className={`episode-item ${isWatched ? 'watched' : ''}`} onClick={() => onToggle(id)}>
      <div className="checkbox">
        {isWatched && <FiCheck className="check-icon" />}
      </div>
      <div className="episode-info">
        <span className="episode-number">{episodeNumber}.</span>
        <span className="episode-name">{name}</span>
      </div>
    </div>
  );
}