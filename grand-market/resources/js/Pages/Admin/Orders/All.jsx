import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function All({ auth, orders }) {

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
        >
            <Head title="Orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Orders</h3>
                            {orders.length > 0 ? (
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User ID</th>
                                            <th>Total Price</th>
                                            <th>Shipping Address</th>
                                            <th>Phone Number</th>
                                            <th>Description</th>
                                            <th>Order Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.user_id}</td>
                                                <td>{order.total_price}</td>
                                                <td>{order.postal_code} {order.city} {order.address}</td>
                                                <td>{order.phone_number}</td>
                                                <td>{order.description !== null ? order.description : 'No Description Specified'}</td>
                                                <td>{formatOrderTime(order.created_at)}</td>
                                                <td><a href={route('admin.order.details', order.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a></td>
                                                <td><a href={route('admin.order.confirm.delete', order.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
