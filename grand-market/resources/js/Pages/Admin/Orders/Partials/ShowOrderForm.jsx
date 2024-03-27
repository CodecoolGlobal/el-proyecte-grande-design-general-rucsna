import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

const ShowOrderForm = ({ order }) => {
    const { data, setData, get, errors, processing, recentlySuccessful } = useForm({
        id: order.id,
        price: order.total_price,
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/admin/get/order/details/${order.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [order.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('admin.orders.list', order.id));
    };

    return (
        <section className="max-w-xL">
            <header>
                <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="id" value="ID" />
                    <TextInput
                        id="id"
                        className="mt-1 block w-full"
                        value={data.id}
                        disabled
                    />
                </div>
                <div>
                    <InputLabel htmlFor="price" value="Price" />
                    <TextInput
                        id="price"
                        className="mt-1 block w-full"
                        value={data.price}
                        disabled
                    />
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900">Products in this Order</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Back</PrimaryButton>
                </div>
            </form>
        </section>
    );
};

export default ShowOrderForm;
