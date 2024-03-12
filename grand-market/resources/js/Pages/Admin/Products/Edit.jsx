import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProductForm from './Partials/UpdateProductForm';

export default function Edit({ auth, product })
{
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product #{product.id}</h2>}
        >
            <Head title={"Product #" + product.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <UpdateProductForm product={product}></UpdateProductForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}