import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function All({ auth, products }) {

    const formatOrderTime = (timeString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(timeString).toLocaleString('en-US', options);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Products</h3>
                            {products.length > 0 ? (
                                <ul>
                                    {products.map(product => (
                                        <li key={product.id}>
                                            <div>
                                                <b>ID:</b> {product.id} 
                                                <b> Name:</b> {product.name}
                                                <b> Description:</b> {product.description !== null ? product.description : 'No Description Specified'}
                                                <b> Price:</b> {product.price} 
                                                <b> Stock:</b> {product.stock} 
                                                <b> Created at:</b> {formatOrderTime(product.created_at)}
                                                <b> Updated at:</b> {formatOrderTime(product.updated_at)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No Products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
