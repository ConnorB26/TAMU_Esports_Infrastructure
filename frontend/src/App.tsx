import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MembersPage from './pages/MembersPage';
import ConstructionPage from './pages/ConstructionPage';
import Footer from './components/Footer';
import { ShopifyCollection } from './pages/ShopPage';

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <div className="mainContent">
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="shop" element={<ShopifyCollection />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
