import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PlaceOrderForm from './Partials/PlaceOrderForm';

export default function Show({ auth }) {
    const [cartItems, setCartItems] = useState([]);
    const [showPlaceOrderForm, setShowPlaceOrderForm] = useState(false);

    useEffect(() => {
        const fetchCartItems = () => {
            const items = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(items);
        };
        fetchCartItems();
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString('en-US', { minimumFractionDigits: 2 });
    };

    const calculateTotalPrice = () => {
        return parseFloat(cartItems.reduce((total, item) => {
            const quantity = item.quantity || 1;
            return total + (item.price * quantity);
        }, 0)).toFixed(2);
    };

    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (index, event) => {
        const quantity = parseInt(event.target.value);
        if (!isNaN(quantity) && quantity >= 0) {
            const updatedCart = [...cartItems];
            updatedCart[index].quantity = quantity;
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleConfirmOrder = () => {
        setShowPlaceOrderForm(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cart</h2>}
        >
            <div>
                {showPlaceOrderForm ? (
                    <PlaceOrderForm />
                ) : (
                    <div>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <div>
                                {cartItems.map((item, index) => (
                                    <div key={index}>
                                        <p>{item.name} - ${formatPrice(item.price)} x 
                                            <input 
                                                type="number" 
                                                value={item.quantity || 1} 
                                                onChange={(event) => handleQuantityChange(index, event)} 
                                                min="1"
                                            /> = ${formatPrice(item.price * (item.quantity || 1))}
                                        </p>
                                        <button onClick={() => handleRemoveItem(index)}>Remove</button>
                                    </div>
                                ))}
                                <br></br>
                                <p>Total Price: ${formatPrice(calculateTotalPrice())}</p>
                                <button onClick={handleConfirmOrder}>Confirm Order</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};
