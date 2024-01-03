import React, { useEffect, useState } from 'react';
import { Container, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { oauthUrl } from '../utilities/config';
import { useAuth } from '../utilities/AuthContext';

const LoginPage: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { isAuthenticated, validateToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        const success = query.get('success');
        const failure = query.get('failure');

        if (success) {
            setToastMessage('Login successful!');
            setShowToast(true);
        } else if (failure) {
            setToastMessage('Login failed. Please try again.');
            setShowToast(true);
        }

        if (token) {
            validateToken(token);
        }
    }, [location, isAuthenticated, validateToken, navigate]);

    const handleLoginClick = () => {
        window.location.href = oauthUrl;
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Button variant="primary" onClick={handleLoginClick}>
                Login with Discord
            </Button>

            <ToastContainer position='top-center'>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default LoginPage;
