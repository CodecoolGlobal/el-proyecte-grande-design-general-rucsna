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
                                <ul>
                                    {orders.map(order => (
                                        <li key={order.id}>
                                            <div>
                                                <b>ID:</b> {order.id} 
                                                <b> User ID:</b> {order.user_id}
                                                <b> Total Price:</b> {order.total_price} 
                                                <b> Shipping Address:</b> {order.postal_code} {order.city} {order.address} 
                                                <b> Phone Number:</b> {order.phone_number} 
                                                <b> Description:</b> {order.description !== null ? order.description : 'No Description Specified'} 
                                                <b> Order Time:</b> {formatOrderTime(order.created_at)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
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
