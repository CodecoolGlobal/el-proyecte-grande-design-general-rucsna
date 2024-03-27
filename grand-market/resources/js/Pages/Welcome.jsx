import { Link, Head, usePage } from '@inertiajs/react';
import LimitedProducts from "@/Pages/LimitedProducts.jsx";
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import ShoppingCartLayout from '@/Layouts/ShoppingCartLayout.jsx';
import React, { useState } from 'react';
export default function Welcome({ auth }) {
    const { props: { products } } = usePage();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [searchedProducts, setSearchedProducts] = useState([]);

    const updateCartItemsCount = (count) => {
        setCartItemsCount(count);
    };

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        setCartItemsCount(cartItems.length);
    };
    return (
        <GuestLayout setSearchedProducts={setSearchedProducts}>
            <ShoppingCartLayout cartItemsCount={cartItemsCount} updateCartItemsCount={updateCartItemsCount} />
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                {searchedProducts.length > 0 ? (
                    <LimitedProducts searchedProducts={searchedProducts}/>
                ) : (
                    <div className="max-w-7xl mx-auto p-6 lg:p-8">
                        <div className="grid grid-cols-1 gap-6 lg:gap-8">
                            <LimitedProducts category="Clothing"/>
                            <LimitedProducts category="Books"/>
                            <LimitedProducts category="Electronics"/>
                            <LimitedProducts category="Household"/>
                        </div>
                    </div>)}
            </div>
        </GuestLayout>
    );
}
