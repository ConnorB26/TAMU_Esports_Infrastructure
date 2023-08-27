import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import AboutPage from './containers/AboutPage';
import NotFoundPage from './containers/NotFoundPage';
import Header from './components/Header';
import ContactPage from './containers/ContactPage';
import CustomHeader from './components/CustomHeader';

function App() {
  return (
    <BrowserRouter>
      <CustomHeader />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
