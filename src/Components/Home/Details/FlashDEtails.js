import React from 'react';

const FlashDEtails = ({product}) => {
    const {image,name,price,discount} = product;
    const imageURL = `http://localhost:7000/images/${image}`;
    return (
     <div>
      <div class="relative  rounded-lg border border-gray-100 bg-white shadow-md">
  <a class="relative mx-3 mt-3 flex h-40  overflow-hidden" href="/">
    <img class="object-cover w-44" src={imageURL} alt={name} />
    <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{discount.discountPercentage}% OFF</span>
  </a>
  <div class="mt-4 px-5">
    <a href="/">
      <h5 class="text-md tracking-tight text-slate-900">{name}</h5>
    </a>
   
      <p>
        <span class="text-xl text-center font-bold text-slate-900">${price}</span>
      </p>
  
   
  </div>
</div>

     </div>
    
    );
};

export default FlashDEtails;