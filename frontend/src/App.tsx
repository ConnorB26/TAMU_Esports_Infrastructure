import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
//import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MembersPage from './pages/MembersPage';
import ConstructionPage from './pages/ConstructionPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="appContainer">
      <div className="mainContent">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="rosters" element={<ConstructionPage />} />
            <Route path="awards" element={<ConstructionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
