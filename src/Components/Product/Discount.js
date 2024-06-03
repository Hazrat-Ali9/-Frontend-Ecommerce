import React from 'react';
import { useLocation } from 'react-router-dom';

const Discount = () => {
  const location = useLocation();
  const { products } = location.state || {};
 
  
  return (
    <div className='mx-10'>
      <h2>Discounted Products</h2>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <div key={product._id} className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <a className="relative flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={`http://localhost:7000/images/${product.image}`} alt="product image" />
                {product.discount && (
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    {product.discount.discountPercentage}% OFF
                  </span>
                )}
              </a>
              <div className="mt-4 px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                    {product.discount && (
                      <span className="text-sm text-slate-900 line-through">${Math.round(product.price / (1 - product.discount.discountPercentage / 100))}</span>
                    )}
                  </p>
                </div>
                <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to cart
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No discounted products available.</p>
      )}
    </div>
    );
};
export default Discount;