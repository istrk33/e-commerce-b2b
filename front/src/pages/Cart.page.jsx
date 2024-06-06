import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { useJwt } from 'react-jwt';
import Card from '../components/Product-Card';

const Cart = () => {
    // const { logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    // const { decodedToken } = useJwt(localStorage.getItem('token') || '');
    // var username = "";
    // if (decodedToken) {
    //     console.log(decodedToken);
    //     var username = decodedToken.username;
    //     // Utilisez les données du token ici
    // } else {
    //     // Gérez le cas où le token n'est pas valide ou n'existe pas
    // }
    const [products, setProducts] = useState(null);
    const [productToDisplay, setProductToDisplay] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/orders/cart/${user}`)
            .then((response) => {
                return response.json();
            })
            .then((responseProducts) => {
                setProducts(responseProducts);
            });
    }, []);

    const generateCards = () => {
        return products.map((card, index) => (
            <div key={index} className="flex flex-col justify-between md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                <Card {...card} />
            </div>
        ));
    };

    return (
        <div>
            <h2>Boutique</h2>
            {products ? (
                // <div>
                //     {products.map((p) => (
                //         // { title, price, stock, description, imageUrl }
                //         <Card 
                //         key={p.id}
                //         title={p.title}
                //         price={p.price}
                //         description={p.description}
                //         stock={p.stock}
                //         imageUrl={p.imageUrl}
                //         color={p.color}

                //         />
                //     ))}
                // </div>
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

export default Cart;
