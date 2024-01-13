import React, { useEffect, useState } from 'react';
import { Container, Button, Toast, ToastContainer, Row, Col } from 'react-bootstrap';
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
            setToastMessage('You are not a registered member of Texas A&M Esports.');
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
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <p className="text-center">
                        Howdy and welcome to the Esports facility reservation system for Texas A&M!
                    </p>
                    <p className="text-center">
                        To continue past this page, you need to be a registered member in the <a href='https://discord.gg/tamuesports' target='_blank' rel='noreferrer'>official discord</a>, and then you can log in using the button below with your discord.
                    </p>
                    <p className="text-center">
                        Only game coordinators can make reservations for their teams at the moment, with members only able to see facility information and any reservations made for them.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="primary" onClick={handleLoginClick}>
                        Login with Discord
                    </Button>
                </Col>
            </Row>

            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={10000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

        </Container >
    );
};

export default LoginPage;
