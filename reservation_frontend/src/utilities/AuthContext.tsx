import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import DecodedToken from '../models/DecodedToken';
import { getCookie, setCookie } from './cookieUtils';
import { checkTokenValidity } from './authService';
import { useLocation } from 'react-router-dom';

interface AuthContextProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: DecodedToken | null;
    validateToken: (token?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    validateToken: async () => { }
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<DecodedToken | null>(null);

    const location = useLocation();

    const validateToken = async (token?: string) => {
        const authToken = token || getCookie('authToken');
        if (!authToken) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await checkTokenValidity(authToken);
            if (response.valid) {
                setIsAuthenticated(true);
                setUser(response.decoded);
                if (token) {
                    setCookie('authToken', authToken, 3600);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        }
        setIsLoading(false);
    };


    useEffect(() => {
        validateToken();
    }, [location]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, validateToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
