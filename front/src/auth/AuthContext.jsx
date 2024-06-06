import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/api/protected', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
        }
    }, []);

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
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
