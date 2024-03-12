import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteCategoryForm from './Partials/DeleteCategoryForm';

export default function Delete({ auth, category })
{
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category #{category.id}</h2>}
        >
            <Head title={"Category #" + category.id} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DeleteCategoryForm category={category}></DeleteCategoryForm>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}