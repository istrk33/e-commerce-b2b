import React, { useContext, useState } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        birth_city: '',
        birth_date: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyer les données du formulaire au backend pour la création du compte
        console.log(formData);
        register(formData)
        // http://localhost:8000/api/users
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Nom d'utilisateur</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nom complet</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="birth_city" className="block text-gray-700 font-semibold mb-2">Ville de naissance</label>
                    <input type="text" id="birth_city" name="birth_city" value={formData.birth_city} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="birth_date" className="block text-gray-700 font-semibold mb-2">Date de naissance</label>
                    <input type="date" id="birth_date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Créer le compte</button>
            </form>
        </div>
    );
};

export default Register;
