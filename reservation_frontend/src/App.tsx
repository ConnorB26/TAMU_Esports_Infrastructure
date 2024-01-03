import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import BlankPage from './pages/BlankPage';
import LoginPage from './pages/LoginPage';
import withAuth from './utilities/withAuth';
import { AuthProvider } from './utilities/AuthContext';

// Wrapped components
const AuthBlankPage = withAuth(BlankPage, "default");
const AuthReservationPage = withAuth(BlankPage, "reservation");
const AuthAdminPage = withAuth(BlankPage, "admin");

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<AuthBlankPage />} />
          <Route path="reservation" element={<AuthReservationPage />} />
          <Route path="admin" element={<AuthAdminPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
