import React, { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import { useJwt } from 'react-jwt';

const Store = () => {
    const { logout } = useContext(AuthContext);
    // const { user, logout } = useContext(AuthContext);
    const { decodedToken } = useJwt(localStorage.getItem('token') || '');
    var username = "";
    if (decodedToken) {
        console.log(decodedToken);
        var username = decodedToken.username;
        // Utilisez les données du token ici
    } else {
        // Gérez le cas où le token n'est pas valide ou n'existe pas
    }
    return (
        <div>
            <h2>Boutique</h2>
            {/* <p>Welcome, {user ? user.username : 'Guest'}</p> */}
            <p>Welcome, {username}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Store;
