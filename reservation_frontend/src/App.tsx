import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import BlankPage from './pages/BlankPage';
import LoginPage from './pages/LoginPage';
import withAuth from './utilities/withAuth';
import { AuthProvider } from './utilities/AuthContext';

const AuthBlankPage = withAuth(BlankPage, "default");
const AuthReservationPage = withAuth(BlankPage, "reservation");
const AuthAdminPage = withAuth(BlankPage, "admin");

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<AuthBlankPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="reservation" element={<AuthReservationPage />} />
          <Route path="admin" element={<AuthAdminPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
