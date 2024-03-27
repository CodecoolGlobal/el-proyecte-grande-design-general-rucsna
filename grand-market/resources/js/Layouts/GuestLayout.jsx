import SearchProducts from "@/Pages/SearchProducts.jsx";

export default function Guest({ children, setSearchedProducts }) {

    return (
        <div className="">
            <div className="">
                <SearchProducts setSearchedProducts={setSearchedProducts}/>
                {children}
            </div>
        </div>
    );
}
