import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import Register from './auth/Register';
import Store from './pages/Store.page';
import NavBar from './components/Nav';


const PrivateRoute = ({ component: Component }) => {
    return localStorage.getItem('token') ? (
        <Component />
    ) : (
        <Navigate to="/login" />
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store" element={<PrivateRoute component={Store} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
