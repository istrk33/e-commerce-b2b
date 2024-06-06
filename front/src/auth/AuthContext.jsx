import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [location.pathname]);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            setUser({ username });
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    const register = async (username, password) => {
        try {
            await axios.post('http://localhost:8000/api/register', { username, password });
        } catch (error) {
            throw new Error('Error registering user');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
