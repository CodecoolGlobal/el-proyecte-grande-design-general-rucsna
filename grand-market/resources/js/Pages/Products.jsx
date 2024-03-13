import {Head, usePage} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
export default function Products({ category }) {
    const {props: {products}} = usePage();

    return (
        <GuestLayout>
            <Head title="Products"/>

            <div
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                <div>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                        {category}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products && products.map(product => (
                            <div key={product.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">{product.description}</p>
                                <p className="text-gray-900 dark:text-gray-100 font-bold">{product.price}</p>
                                <p className="text-gray-500 dark:text-gray-400">{product.stock}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <NavLink href={route('main')}>Back</NavLink>
        </GuestLayout>
    );
}
