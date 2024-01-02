import React, { useEffect, useState } from 'react';
import { Container, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { oauthUrl } from '../config';
import { setCookie, getCookie } from '../utilities/cookieUtils';
import { checkTokenValidity } from '../utilities/authService';

const LoginPage: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        const success = query.get('success');
        const failure = query.get('failure');

        // Check if already have a valid token
        const existingToken = getCookie('authToken');
        if (existingToken) {
            validateExistingToken(existingToken);
        }

        if (success) {
            setToastMessage('Login successful!');
            setShowToast(true);
        } else if (failure) {
            setToastMessage('Login failed. Please try again.');
            setShowToast(true);
        }

        if (token) {
            validateAndHandleToken(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const validateExistingToken = async (token: string) => {
        const isValid = await checkTokenValidity(token);
        if (isValid) {
            navigate('/');
        }
    };

    const validateAndHandleToken = async (token: string) => {
        const isValid = await checkTokenValidity(token);
        if (isValid) {
            setCookie('authToken', token, 3600);
            navigate('/');
        } else {
            setToastMessage('Invalid token. Please try logging in again.');
            setShowToast(true);
        }
    };

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
