import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GamePage from './pages/GamePage';
import ContactPage from './pages/ContactPage';
import AccomplishmentsPage from './pages/AccomplishmentsPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'; // <- Import your CSS here.

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      /*const response = await axios.get('/api/games');
      setGames(response.data);
      setLoading(false);*/

      setGames([]);
      setLoading(false);
    }

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app"> {/* <- Here's the change */}
        <Header games={games} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {games.map((game) => (
              <Route key={game.id} path={`/games/${game.id}`} element={<GamePage game={game} />} />
            ))}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/accomplishments" element={<AccomplishmentsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;