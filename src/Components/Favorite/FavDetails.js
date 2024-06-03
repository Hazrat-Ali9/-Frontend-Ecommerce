import React from "react";

const FavDetails = ({ favorite }) => {
  const { productName, price,image } = favorite;
  const imageURL = `http://localhost:7000/images/${image}`;
  return (
    <div>
      <div class="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
      <div class="prod-title">
        <p class="text-md uppercase text-gray-900 font-bold text-center">{productName}</p>
      </div>
      <div class="prod-img mt-3 mx-auto">
        <img src={imageURL}alt={productName}
             class="w-40 h-40 object-cover object-center" />
      </div>
      <div class="">
       
        <div class="flex flex-col md:flex-row justify-between items-center text-gray-900 mt-10">
          <p class="font-bold text-xl">$ {price}</p>
          <button
                  class="px-4 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FavDetails;
