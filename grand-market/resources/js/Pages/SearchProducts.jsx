import TextInput from "@/Components/TextInput.jsx";
import {useState} from "react";

export default function SearchProducts({setSearchedProducts}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const term = searchTerm.trim();
        console.log(searchTerm);
        if(term !== ""){
            fetch(`/search/${term}`)
                .then(response => {
                    if (!response.ok) {
                        console.error("Error with the network");
                    }
                    console.log(response);
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setSearchedProducts(data);
                    setSearchTerm("");
                })
                .catch(error => {
                    console.error("Error with fetching data", error);
                });
        } else {
            alert("Please, write a search term!");
        }
    }

    return (
        <div>
            <div className="search-bar.container">
                <div className="search-bar">
                    <TextInput
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

