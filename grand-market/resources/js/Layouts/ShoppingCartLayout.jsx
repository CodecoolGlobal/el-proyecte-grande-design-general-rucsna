import React, { useState, useEffect } from 'react';

const ShoppingCartLayout = ({ }) => {

    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {

        const fetchCartItemsCount = () => {

            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItemsCount(cartItems.length);
        };

        fetchCartItemsCount();
    }, []);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/cart"><i className="fa fa-shopping-cart"></i>Go To Cart ({cartItemsCount} products)</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default ShoppingCartLayout;
