import {Head, usePage} from "@inertiajs/react";
import NavLink from "@/Components/NavLink.jsx";

export default function LimitedProducts({category, searchedProducts}) {
    const {props: {limitedProducts}} = usePage();

    console.log("limited", searchedProducts);

    return (
        <div>
            <Head title="LimitedProducts"/>

            <div
                className="scale-100 p-10 bg-white dark:bg-gray-800/50 rounded-xl shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                <div>
                    {searchedProducts ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            {searchedProducts.map(sp => (
                                <div
                                    key={sp.id}
                                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
                                >
                                    <h3 className="text-lg font-semibold mb-2">
                                        {sp.name}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        {sp.description}
                                    </p>
                                    <p className="text-gray-900 dark:text-gray-100 font-bold">
                                        {sp.price}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {sp.stock}
                                    </p>
                                    <button onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>))}
                            <NavLink href={route("main")}>Back</NavLink>
                        </div>
                    ) : (
                        <div key={category.id}>
                            <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-white">
                                <NavLink href={route('products.category', category)}>{category}</NavLink>
                            </h2>
                            {limitedProducts && Object.entries(limitedProducts).map(([name, products]) => (
                                name === category ? (
                                    <div key={name} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                                        {products.map(product => (
                                            <div
                                                key={product.id}
                                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4"
                                            >
                                                <h3 className="text-lg font-semibold mb-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-900 dark:text-gray-100 font-bold">
                                                    {product.price}
                                                </p>
                                                <button onClick={() => addToCart(product)}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))
                                        }
                                    </div>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
