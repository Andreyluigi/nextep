import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch, FiTv } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim().length > 2) {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FiTv className="logo-icon" />
        <span>NextEp</span>
      </Link>
      
      <form onSubmit={handleSearch} className="search-form">
        <FiSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Buscar séries..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>
    </nav>
  );
}