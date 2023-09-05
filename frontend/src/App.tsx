import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import AboutPage from './containers/AboutPage';
import NotFoundPage from './containers/NotFoundPage';
import Header from './components/Header';
import ContactPage from './containers/ContactPage';
import MembersPage from './containers/MembersPage';
import ConstructionPage from './containers/ConstructionPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="appContainer">
      <div className="mainContent">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<ConstructionPage />} />
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
