import {Head, usePage} from "@inertiajs/react";
import NavLink from "@/Components/NavLink.jsx";
export default function Products({ category }) {
    const {props: {products}} = usePage();

    return (
        <div>
            <Head title="Products"/>

            <div
                className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                <div>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                        <NavLink href={route('products.category', category)}>{category}</NavLink>
                    </h2>
                    <ul>
                        {products && products.map(product => (
                            <li key={product.id}>{product.name} - {product.price}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
