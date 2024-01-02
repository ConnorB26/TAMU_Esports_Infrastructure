import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import BlankPage from './pages/BlankPage';
import LoginPage from './pages/LoginPage';
import withAuth from './utilities/withAuth';
import Header from './components/Header';

// Wrapped components
const AuthBlankPage = withAuth(BlankPage);
const AuthAdminPage = withAuth(BlankPage, true);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<><Header isAuthorized={true} /> <BlankPage /></>} />
        <Route path="admin" element={<AuthAdminPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
