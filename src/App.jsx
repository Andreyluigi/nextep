import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="app-container fade-in">
      <Navbar />
      <ScrollToTop />
      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tv/:id" element={<Details />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;