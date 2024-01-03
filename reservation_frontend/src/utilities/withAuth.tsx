import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Header from '../components/Header';
import { Container, Spinner } from 'react-bootstrap';

const withAuth = (WrappedComponent: ComponentType<any>, accessLevel = 'default') => {
    return (props: any) => {
        const { isAuthenticated, isLoading, user } = useAuth();

        const hasAccess = () => {
            switch (accessLevel) {
                case 'admin':
                    return user?.is_admin;
                case 'reservation':
                    return user?.reservation_access;
                default:
                    return isAuthenticated;
            }
        };

        if(isLoading) {
            return (
                <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="border" />
                </Container>
            );
        }

        if (!hasAccess()) {
            return <Navigate to={isAuthenticated ? "/" : "/login"} />;
        }

        return (
            <>
                <Header />
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withAuth;
