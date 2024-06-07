import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import CartItem from '../components/Cart-Item';
import { useJwt } from 'react-jwt';
import TextInput from '../components/Text-Input';
import { CheckIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Cart = () => {
    const { decodedToken } = useJwt(localStorage.getItem('token') || '');
    const [username, setUsername] = useState("");
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [invoiceAddress, setInvoiceAddress] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            if (!localStorage.getItem('token') || !decodedToken) return;
    
            setLoading(true);
            setError(null);
    
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
    
            try {
                const response = await fetch(`http://localhost:8000/api/orders/cart/${decodedToken.username}`, config);
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const responseProducts = await response.json();
                setCart(responseProducts);
                setInvoiceAddress(responseProducts.invoiceAddress);
                setDeliveryAddress(responseProducts.shippingAddress);
                setDeliveryMethod(responseProducts.shippingMethod);
    
                let calculatedTotal = 0;
                responseProducts.items.forEach((item) => {
                    calculatedTotal += item.quantity * item.product.price;
                });
                setTotal(calculatedTotal);
    
            } catch (error) {
                console.error('Error fetching cart:', error);
                setError('Erreur lors de la récupération du panier. Veuillez réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchCart();
    }, [decodedToken]);
    

    const handleUpdateAddresses = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        if (invoiceAddress !== "" && invoiceAddress !== null) {
            const dataInvoice = {
                invoice_address: invoiceAddress
            }
            const responseInvoice = await axios.put(`http://localhost:8000/api/orders/${cart.id}/update-invoice-address`, dataInvoice, config);
            console.log('Response:', responseInvoice.data);
        }
        if (deliveryMethod !== "" && deliveryMethod !== null && deliveryAddress !== "" && deliveryAddress !== null) {
            const dataDelivery = {
                shipping_method: deliveryMethod,
                shipping_address: deliveryAddress,
            }
            const responseDelivery = await axios.put(`http://localhost:8000/api/orders/${cart.id}/update-shipping-address`, dataDelivery, config);
            console.log('Response:', responseDelivery.data);
        }
    }

    const handlePay = async () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        const responsePay = await axios.put(`http://localhost:8000/api/orders/${cart.id}/pay`, config)
            .then(alert("Paiement pris en compte !"));
        console.log('Response:', responsePay.data);
    }

    return (
        <div className="container mx-auto p-6" >
            <h1 className="text-2xl font-bold mb-6">Panier,Total: {total} €</h1>
            <div className="text-center p-4 bg-white  rounded-md flex">
                <p>Panier créée le</p>&nbsp;
                <div className="text-xl font-semibold" style={{ marginTop: "-3px" }}>
                    {(new Date(cart.createdAt)).toLocaleDateString()}
                </div>&nbsp;à&nbsp;
                <div className="text-lg text-gray-600" style={{ marginTop: "-3px" }}>
                    {(new Date(cart.createdAt)).toLocaleTimeString()}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" >
                <TextInput
                    label="Adresse de facturation"
                    placeholder="7 rue du Otuz Bir 33000 Bordeaux"
                    value={invoiceAddress}
                    onChange={(e) => setInvoiceAddress(e.target.value)}
                />
                <br />
                <TextInput
                    label="Moyen de livraison"
                    placeholder="Livraison à domicile"
                    value={deliveryMethod}
                    onChange={(e) => setDevliveryMethod(e.target.value)}
                />
                <TextInput
                    label="Adresse de livraison"
                    placeholder="19 rue du Atmis Dokuz 33000 Bordeaux"
                    value={deliveryAddress}
                    onChange={(e) => setDevliveryAddress(e.target.value)}
                />
                <button
                    onClick={handleUpdateAddresses}
                    // disabled={isLoading}
                    className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 `}
                >
                    Mettre à jour
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : cart.items.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Image</th>
                                <th className="py-2 px-4 border-b">Titre</th>
                                <th className="py-2 px-4 border-b">Couleur</th>
                                <th className="py-2 px-4 border-b">Quantité</th>
                                <th className="py-2 px-4 border-b">Prix</th>
                                <th className="py-2 px-4 border-b">Total</th>
                                <th className="py-2 px-4 border-b">Enlever</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((item) => {
                                return (
                                    <CartItem
                                        key={item.product.id}
                                        id={item.product.id}
                                        imageUrl={item.product.imageUrl}
                                        title={item.product.title}
                                        quantity={item.quantity}
                                        color={item.product.color}
                                        priceUnity={item.product.price}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">Votre panier est vide.</p>
            )}
            <br />
            <ProgressBar currentStep={2} />
            <br />
            <button
                onClick={handlePay}
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 `}
            >
                Paiement
            </button>
        </div>
    );
};

const Step = ({ active, text }) => (
    <div className="flex items-center justify-center">
        <div className={`w-6 h-6 rounded-full border-2 ${active ? 'bg-blue-500 border-blue-500' : 'bg-gray-200 border-gray-300'} flex items-center justify-center`}>
            {active ? (
                <CheckIcon className="w-4 h-4 text-white" />
            ) : (
                <span className="text-gray-500">1</span>
            )}
        </div>
        <p className={`ml-2 ${active ? 'text-blue-500' : 'text-gray-500'}`}>{text}</p>
    </div>
);

const ProgressBar = ({ currentStep }) => {
    return (
        <div className="w-full h-10 bg-gray-200 rounded-full flex items-center">
            <div className={`w-1/3 flex items-center justify-center ${currentStep >= 1 ? 'text-blue-500' : 'text-gray-500'}`}>
                <Step active={currentStep >= 1} text="Étape 1" />
            </div>
            <div className={`w-1/3 flex items-center justify-center ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-500'}`}>
                <Step active={currentStep >= 2} text="Étape 2" />
            </div>
            <div className={`w-1/3 flex items-center justify-center ${currentStep >= 3 ? 'text-blue-500' : 'text-gray-500'}`}>
                <Step active={currentStep >= 3} text="Étape 3" />
            </div>
        </div>
    );
};


export default Cart;
