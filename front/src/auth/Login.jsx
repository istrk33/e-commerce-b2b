import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            setError(null);
            navigate('/store');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex  flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-slate-800 p-10 rounded-2xl">
                <img className="mx-auto h-10 w-auto" src="https://www.bimmer-merch.com/cdn/shop/files/Bimmer_Merch_Logo_-_Rectangle.png?v=1669472961" alt="Your Company" />
            </div>

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Connexion</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Identifiant</label>
                        <div className="mt-2">
                            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Connexion</button>
                    </div>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
