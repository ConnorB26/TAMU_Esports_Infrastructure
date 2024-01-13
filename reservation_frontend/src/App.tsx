import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import BlankPage from './pages/BlankPage';
import LoginPage from './pages/LoginPage';
import withAuth from './utilities/withAuth';
import { AuthProvider } from './utilities/AuthContext';
import HomePage from './pages/HomePage';

const AuthHomePage = withAuth(HomePage, "default");
const AuthReservationPage = withAuth(BlankPage, "reservation");
const AuthAdminPage = withAuth(BlankPage, "admin");

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="" element={<AuthHomePage />} />
          <Route index path="login" element={<LoginPage />} />
          <Route path="reservation" element={<AuthReservationPage />} />
          <Route path="admin" element={<AuthAdminPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
