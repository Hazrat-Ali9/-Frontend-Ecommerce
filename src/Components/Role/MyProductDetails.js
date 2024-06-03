import React from "react";
import { Link } from "react-router-dom";

const MyProductDetails = ({ post }) => {
  const { _id, name, email, price, image,status } = post;
  const imageURL = `http://localhost:7000/images/${image}`;
  return (
    <div>
      <div class="flex flex-col rounded-lg bg-white sm:flex-row">
        <img
          className="m-2 h-24 w-28 rounded-md border object-cover object-center"
          src={imageURL}
          alt=""
        />
        <div class="flex w-full flex-col px-4 py-4">
          <span class="font-semibold">{name}</span>
          <span class="float-right text-gray-400">{email}</span>
          <p class="text-lg font-bold">Price $ {price}</p>
          <p class="text-lg font-bold">Status {status}</p>
          <Link to={`/update/${_id}`}>
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-1 overflow-hidden text-md mt-5 font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-3 py-2 transition-all ease-in duration-75 bg-red-600 rounded-md group-hover:bg-opacity-0">
                Update Product
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProductDetails;
