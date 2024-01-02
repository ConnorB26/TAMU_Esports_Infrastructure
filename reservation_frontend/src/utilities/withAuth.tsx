import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { getCookie } from './cookieUtils';
import { checkTokenValidity } from './authService';
import { Container, Spinner } from 'react-bootstrap';

interface DecodedToken {
    uin: string;
    is_admin: boolean;
}

const withAuth = (WrappedComponent: React.ComponentType, adminOnly: boolean = false) => {
    return (props: any) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(true);

        useEffect(() => {
            const authToken = getCookie('authToken');
            if (!authToken) {
                setIsLoading(false);
                setIsAuthenticated(false);
                setIsAuthorized(false);
                return;
            }

            const validateToken = async () => {
                const response = await checkTokenValidity(authToken);
                if (!response.valid) {
                    setIsAuthenticated(false);
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }

                try {
                    const decoded: DecodedToken = response.decoded;
                    setIsAuthenticated(true);
                    setIsAuthorized(adminOnly ? decoded.is_admin : true);
                } catch (error) {
                    setIsAuthenticated(false);
                    setIsAuthorized(false);
                }
                setIsLoading(false);
            };

            validateToken();
        }, []);

        if (isLoading) {
            return <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner />
            </Container>;
        }

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        if (!isAuthorized) {
            return <Navigate to="/" />;
        }

        return (
            <>
                <Header isAuthorized={isAuthorized} />
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withAuth;
