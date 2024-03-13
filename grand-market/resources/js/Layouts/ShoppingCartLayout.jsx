import React, { useState, useEffect } from 'react';
import NavLink from '@/Components/NavLink';

const ShoppingCartLayout = ({ cartItemsCount, updateCartItemsCount }) => {
    useEffect(() => {
        const fetchCartItemsCount = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            updateCartItemsCount(cartItems.length);
        };
        fetchCartItemsCount();
    }, [updateCartItemsCount]);

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink href={route('cart.index')}>
                              Go To Cart ({cartItemsCount} products)
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default ShoppingCartLayout;