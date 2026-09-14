import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-container fade-in">
      <Navbar />
      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<h1 className="title-premium">Resultados da Busca</h1>} />
          <Route path="/tv/:id" element={<h1 className="title-premium">Detalhes</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;