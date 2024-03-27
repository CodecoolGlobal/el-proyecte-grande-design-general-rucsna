import {Head, usePage} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
import ShoppingCartLayout from "@/Layouts/ShoppingCartLayout.jsx";
import React, {useState} from 'react';

export default function Products({category}) {
    const {props: {products}} = usePage();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [searchedProducts, setSearchedProducts] = useState(null);

    const updateCartItemsCount = (count) => {
        setCartItemsCount(count);
    };

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        const isProductInCart = cartItems.some(item => item.id === product.id);

        if (!isProductInCart) {
            cartItems.push(product);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            setCartItemsCount(cartItems.length);
        } else {
            alert('Product already in cart!');
        }
    };


    return (
        <GuestLayout setSearchedProducts={setSearchedProducts}>
            <ShoppingCartLayout cartItemsCount={cartItemsCount} updateCartItemsCount={updateCartItemsCount}/>
            <Head title="Products"/>

            <div
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                <div>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                        {category}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {searchedProducts ? (
                            searchedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
                                >
                                    <h3 className="text-lg font-semibold mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        {product.description}
                                    </p>
                                    <p className="text-gray-900 dark:text-gray-100 font-bold">
                                        {product.price}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {product.stock}
                                    </p>
                                    <button onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            products && products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
                                >
                                    <h3 className="text-lg font-semibold mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        {product.description}
                                    </p>
                                    <p className="text-gray-900 dark:text-gray-100 font-bold">
                                        {product.price}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {product.stock}
                                    </p>
                                    <button onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <NavLink href={route("main")}>Back</NavLink>
        </GuestLayout>
    );
}
