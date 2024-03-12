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

    const handleDelete = async (productId) => {
        patch(route('admin.product.delete', productId), {
            preserveScroll: true
        });
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
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Created at</th>
                                            <th>Updated at</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description !== null ? product.description : 'No Description Specified'}</td>
                                                <td>{product.price}</td>
                                                <td>{product.stock}</td>
                                                <td>{formatOrderTime(product.created_at)}</td>
                                                <td>{formatOrderTime(product.updated_at)}</td>
                                                <td><a href={route('admin.product.show', product.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a></td>
                                                <td><a href={route('admin.product.confirm.delete', product.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a></td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
