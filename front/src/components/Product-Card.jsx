import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
// import { HiPlusSm, HiMinusSm } from 'react-icons/hi'; // Importation des icônes

const Card = ({ id, title, price, stock, description, imageUrl, color }) => {
    const [quantity, setQuantity] = useState(0);
    const { decodedToken } = useJwt(localStorage.getItem('token') || '');
    const [username, setUsername] = useState("");
    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        if (decodedToken) {
            setUsername(decodedToken.username);
        } else {
            // Gérez le cas où le token n'est pas valide ou n'existe pas
        }
    }, [decodedToken]);

    const handleAddCart = async () => {
        if (quantity >= 1) {
            const data = {
                items: [
                    {
                        productId: id,
                        quantity: quantity,
                    }
                ],
                username: username
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };
                const userCart = await axios.get(`http://localhost:8000/api/orders/cart/${username}`, config);
                if (userCart.data.id) {
                    // edit la commande, modifier les items
                    try {
                        const response = await axios.put(`http://localhost:8000/api/orders/${username}/add-order-item`, data, config);
                        console.log('Response:', response.data);
                        return response.data;
                    } catch (error) {
                        console.error('Error:', error);
                        throw new Error('Error while posting data');
                    }
                } else {
                    // creer une order
                    try {
                        const response = await axios.post('http://localhost:8000/api/orders', data, config);
                        console.log('Response:', response.data);
                        return response.data;
                    } catch (error) {
                        console.error('Error:', error);
                        throw new Error('Error while posting data');
                    }
                }
            } catch (e) {
                console.error('Error:', e);
                throw new Error('Error while getting');
            }
        }
    }
    const handleIncrement = () => {
        if (quantity + 1 <= stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            if (quantity === 0) {
                // remove item de l'order et si seul item delete order
            }
        }
    };

    return (
        <div style={{ textAlign: "initial" }} className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
                className="object-cover w-full h-48"
                src={imageUrl}
                alt={title}
            />
            <div className="px-4 py-2">
                <h2 className="text-gray-800 text-lg font-semibold">{title}</h2>
                <p className="text-gray-600 text-sm mt-1">{price} €</p>
                <p className="text-gray-600 text-sm mt-1">Stock: {stock}</p>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
                <div style={{ display: "flex", marginTop: "5px" }}><p style={{ marginTop: "-3px" }}>Couleur :&nbsp;&nbsp;</p><div className="" style={{ backgroundColor: `${color}`, height: "20px", width: "20px", border: "1px black solid" }}></div></div>
                <div className="flex items-center mt-2 rounded-md">
                    <button
                        onClick={handleDecrement}
                        className="text-lg text-gray-600 focus:outline-none rounded-none max-h-8"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ marginTop: "-7px" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>

                    </button>
                    <input
                        type="text"
                        value={quantity}
                        className="w-12 text-center border border-gray-300 focus:outline-none max-h-8 h-8"
                        readOnly
                    />
                    <button
                        onClick={handleIncrement}
                        className="text-lg text-gray-600 focus:outline-none rounded-none max-h-8"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ marginTop: "-7px" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </button>
                    <button
                        onClick={handleAddCart}
                        className="text-lg text-gray-600 focus:outline-none rounded-none max-h-8"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ marginTop: "-7px" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

