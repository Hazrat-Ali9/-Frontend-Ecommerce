import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import UseItems from "../../Hook/UseItems";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const MoreDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [user] = useAuthState(auth);
  const items = UseItems(id);
  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const url = `http://localhost:7000/product/${id}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const handleAddToFavorites = async () => {
    const favoriteData = {
      productName: items.name,
      price: items.price,
      description: items.description,
      image: items.image,
      type:"favoriteProduct",
      email: user?.email || "",
    };

    const favoriteUrl = "http://localhost:7000/favorite";
    try {
      const response = await fetch(favoriteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteData),
      });

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }
      setIsFavoriteAdded(true);
      toast("Product Added To Favorite Item");
      navigate("/favorites", { replace: true });
      console.log("Navigating to favorite page...");
    } catch (error) {
      console.error("Error saving favorite item:", error);
    }
  };

  const handleAddToCart = async () => {
    const cartData = {
      productName: items.name,
      price: items.price,
      description: items.description,
      image: items.image,
      email: user?.email || "",
    };

    const cartUrl = "http://localhost:7000/cart";
    try {
      const response = await fetch(cartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
       toast("Failed Added to Cart")
      }
      setCart(true);
      toast("Product Added To Cart Successfully");
      navigate("/myOrder", { replace: true });
      console.log("Navigating to Cart page...");
    } catch (error) {
      console.error("Error saving Cart item:", error);
    }
  };

  return (
    <div>
      <div class="mx-5">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2">
            <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
              <div className="relative">
                {service.image && (
                  <img
                    className="object-cover w-72 h-72 mx-auto"
                    src={`http://localhost:7000/images/${service.image}`}
                    alt="Product"
                  />
                )}
                <div className="grid grid-cols-4 md:grid-cols-4 gap-5 mt-10">
                  {service.image && (
                    <img
                      className="object-cover h-28 w-32"
                      src={`http://localhost:7000/images/${service.image}`}
                      alt="Product"
                    />
                  )}
                  {service.image && (
                    <img
                      className="object-cover h-28 w-32"
                      src={`http://localhost:7000/images/${service.image}`}
                      alt="Product"
                    />
                  )}
                  {service.image && (
                    <img
                      className="object-cover h-28 w-32"
                      src={`http://localhost:7000/images/${service.image}`}
                      alt="Product"
                    />
                  )}
                  {service.image && (
                    <img
                      className="object-cover h-28 w-32"
                      src={`http://localhost:7000/images/${service.image}`}
                      alt="Product"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
              <div className="relative">
                <div>
                  <h1 className="text-2xl text-start font-bold">
                    {service.name}
                  </h1>
                  <p className="text-md text-start font-normal">
                    প্রোডাক্ট কোড :G1YL9WN4
                  </p>
                  <div className="flex justify-between px-5">
                    <h1 className="text-2xl font-normal text-orange-600">
                      150 টাকা
                    </h1>
                    <p className="text-md font-normal text-orange-600">
                      120 টাকা
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-5 bg-gray-100 py-3">
                  <div className="mt-2">
                    <h1 className="text-orange-600 text-lg">ডেলিভারি সময়</h1>
                    <h1>3 দিন</h1>
                  </div>
                  <div className="mt-2">
                    <h1 className="text-orange-600 text-lg">ডেলিভারি চার্জ</h1>
                    <p className="text-sm">Chattogram 100 টাকা</p>
                    <p className="text-sm">Chattogram এর বাইরে 130 টাকা</p>
                  </div>
                  <div className="mt-2">
                    <h1 className="text-orange-600 text-lg">Review Dhekhun</h1>

                    <div class="flex items-center">
                      <svg
                        class="w-4 h-4 text-gray-500 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-gray-500 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-gray-500 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-gray-500 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-5">
                  <h1 className="text-2xl font-normal text-black">মজুদ আছে</h1>
                  <p className="text-md font-normal text-orange-600">25 টি</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-5 bg-gray-100 py-3">
                  <div className="mt-2">
                    <h1 className="text-orange-600 text-lg">
                      ai Product Somporkkea
                    </h1>
                    <h1>Admin report korun</h1>
                  </div>
                  <div className="mt-2">
                    <h1 className="text-orange-600 text-lg">Refund Policy</h1>
                    <p className="text-sm">Dhekhun</p>
                  </div>
                  <div className="mt-2">
                    <h1 className="text-orange-600 text-lg">
                      গ্যারেন্টি / ওয়ারেন্টি
                    </h1>
                    <p>Not Available</p>
                  </div>
                </div>
                <div className="flex justify-center gap-10 px-5">
                  <button
                  onClick={handleAddToCart}
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      class="w-5 h-5 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button
                  onClick={handleAddToFavorites}
                    type="button"
                    class="text-white font-medium bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-7 py-3 text-center inline-flex items-center me-2"
                  >
                    <svg
                    className="h-5 w-5 me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                      fill="red"
                    ></path>
                  </svg>
                    Add Favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-xl">প্রোডাক্টের বিবরণ</h1>
            <p>{service.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
