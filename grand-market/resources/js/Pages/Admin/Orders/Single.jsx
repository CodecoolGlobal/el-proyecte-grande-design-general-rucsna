import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ShowOrderForm from './Partials/ShowOrderForm';

export default function Show({ auth, order })
{
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order #{order.id}</h2>}
        >
            <Head title={"Order #" + order.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ShowOrderForm order={order}></ShowOrderForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}