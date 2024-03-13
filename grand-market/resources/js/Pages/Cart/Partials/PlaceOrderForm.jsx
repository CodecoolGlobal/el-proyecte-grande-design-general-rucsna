import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

const PlaceOrderForm = ({ }) => {
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        const fetchCartItems = () => {
            const items = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(items);
            console.log(items);
            setData('cartItems', items)
        };
        fetchCartItems();
    }, []);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        postal_code: "",
        city: "",
        address: "",
        phone_number: "",
        description: "",
        cartItems: null,
    });

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        patch(route('order.store'), {
            preserveScroll: true
        });

        clearCart();
    };

    return (
        <section className="max-w-xL">

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="postal_code" value="Postal Code" />

                    <TextInput
                        id="postal_code"
                        className="mt-1 block w-full"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Place Order</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Success.</p>
                    </Transition>
                </div>
            </form>
            
        </section>
    );
};

export default PlaceOrderForm;
