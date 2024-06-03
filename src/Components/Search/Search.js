import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import NewDetails from '../Product/Details/NewDetails';

const Search = () => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:7000/product?q=${query}`);
          const data = await response.json();
          const filteredProducts = data.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filteredProducts);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

    fetchData();
  }, [query]);
    return (
        <div className='mx-5'>
      <h2>Search Results for "{query}"</h2>
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 gap-y-6">
    {searchResults.map((product) => (
          <NewDetails key={product.id} product={product} />
      
          ))}
    </div>
        
    </div>
    );
};

export default Search;