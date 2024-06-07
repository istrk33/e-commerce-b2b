import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import { useJwt } from 'react-jwt';
// import Card from '../components/Product-Card';

const CartItem = ({ id, title, priceUnity, quantity, imageUrl, color }) => {
    return (
        <tr>
            <td className="py-2 px-4 border-b text-center">{id}</td>
            <td className="py-2 px-4 border-b text-center">
                <img src={imageUrl} alt="Image" className="mx-auto w-12 h-12 object-cover" />
            </td>
            <td className="py-2 px-4 border-b">{title}</td>
            <td className="py-2 px-4 border-b text-center">
                <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: `${color}` }}></span>
            </td>
            <td className="py-2 px-4 border-b text-center">{quantity}</td>
            <td className="py-2 px-4 border-b text-center">{priceUnity}€</td>
            <td className="py-2 px-4 border-b text-center">{priceUnity * quantity}€</td>
            <td className="py-2 px-4 border-b text-center">Supprimer</td>
        </tr>
    );
};

export default CartItem;
