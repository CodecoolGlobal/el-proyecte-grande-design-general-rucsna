import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

const CreateProductForm = ({ categories }) => {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: null,
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.categoryId) {
            alert("Please select a category.");
            return;
        }

        post(route('admin.product.store'), {
            preserveScroll: true
        });
    };

    return (
        <section className="max-w-xL">
            <header>
                <h2 className="text-lg font-medium text-gray-900">Product Creation</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
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

                <div>
                    <InputLabel htmlFor="price" value="Price" />

                    <TextInput
                        id="price"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="stock" value="Stock" />

                    <TextInput
                        id="stock"
                        className="mt-1 block w-full"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Image" />

                    <input type="file" onChange={e => setData('image', e.target.files[0])} />

                </div>

                <div>
                    <InputLabel htmlFor="categoryId" value="Category" />
                    <select
                        id="categoryId"
                        className="mt-1 block w-full"
                        value={data.categoryId || ''}
                        onChange={(e) => setData('categoryId', e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create Product</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Created.</p>
                    </Transition>
                </div>
            </form>
            
        </section>
    );
};

export default CreateProductForm;
