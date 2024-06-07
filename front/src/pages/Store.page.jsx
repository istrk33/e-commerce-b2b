import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { useJwt } from 'react-jwt';
import Card from '../components/Product-Card';
import { useNavigate } from 'react-router-dom';

const Store = () => {
    // const { logout } = useContext(AuthContext);
    // // const { user, logout } = useContext(AuthContext);
    const { decodedToken } = useJwt(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [productToDisplay, setProductToDisplay] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        try {
            fetch("http://localhost:8000/api/products", config)
                .then((response) => {
                    return response.json();
                })
                .then((responseProducts) => {
                    setProducts(responseProducts);
                });
        } catch (e) {
            navigate('/login');
        }
    }, [localStorage.getItem('token')]);

    const generateCards = () => {
        return products.map((card, index) => (
            <div key={index} className="flex flex-col justify-between md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                <Card {...card} />
            </div>
        ));
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Boutique</h1>
            {products ? (
                <div className="container mx-auto mt-8">
                    <div className="flex flex-wrap -mx-2">
                        {generateCards()}
                    </div>
                </div>
            ) : (
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default Store;
