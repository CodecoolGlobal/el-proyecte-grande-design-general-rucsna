import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

const DeleteOrderForm = ({ order }) => {

    const { data, setData, delete: destroy, errors, processing, recentlySuccessful } = useForm({
        id: order.id,
        price: order.total_price,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        destroy(route('admin.order.delete', order.id));
    };

    return (
        <section className="max-w-xL">
            <header>
                <h2 className="text-lg font-medium text-gray-900">order Information</h2>
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Confirm Delete</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Deleted.</p>
                    </Transition>
                </div>
            </form>
            
        </section>
    );
};

export default DeleteOrderForm;
