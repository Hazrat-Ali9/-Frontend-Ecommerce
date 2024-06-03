import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllDetails from '../Home/Details/AllDetails';

const Category = () => {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:7000/category?name=${name}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, [name])
    return (
        <div className='mx-10'>
      <h2 className='text-center font-black mt-5 text-2xl'>Products in Category: {name}</h2>
      <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-14 px-5">
      {products.map(product => (
          <AllDetails
          key={product._id}
          product={product}
          />
        ))}
      </div>
    </div>
    );
};

export default Category;