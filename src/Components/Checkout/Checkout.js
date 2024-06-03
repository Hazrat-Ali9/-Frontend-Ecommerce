import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { selectedOrders,email } = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    selectedOrders.map((order) => ({
      name: "",
      state: "",
      city: "",
      phoneNumber: "",
      distract: "",
      productName: order.productName,
      email,
      price: Number(order.price),
    }))
  );


  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index][name] = value;
      return newData;
    });
  };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    const orderData = formData[index];

    fetch("http://localhost:7000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order placed successfully:", data);
        navigate("/own");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  return (
    <div>
      {selectedOrders.map((order, index) => (
        <div
          key={order._id}
          className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-10"
        >
          <div className="px-4 pt-8 mt-10">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{order.productName}</span>
                  <span className="float-right text-gray-400">
                    Quantity: {order.quantity}
                  </span>
                  <p className="text-lg font-bold">
                    Total Price: ${Number(order.price).toFixed(2)}
                  </p>{" "}
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  checked
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <img
                    className="w-14 object-contain"
                    src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash On Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
            </form>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <form onSubmit={(e) => handleSubmit(e, index)}>
              <div>
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    value={email}
                    className="w-full placeholder:text-black bg-gray-200 rounded-md border border-gray-200 px-4 py-3 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Product Name
                </label>
                <div className="relative">
                  <input
                    value={order.productName}
                    className="w-full placeholder:text-black bg-gray-200 rounded-md border border-gray-200 px-4 py-3 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Price
                </label>
                <div className="relative">
                  <input
                    value={`$${Number(order.price).toFixed(2)}`}
                    className="w-full rounded-md placeholder:text-black bg-gray-200 border border-gray-200 px-4 py-3 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData[index].name}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter Your Name"
                    required
                    className="w-full placeholder:text-black bg-gray-200 rounded-md border border-gray-200 px-4 py-3 pl-11 text-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <label
                  htmlFor="billing-address"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Billing Address
                </label>
                <div className="flex justify-between items-center">
                  <div className="">
                    <input
                      type="text"
                      name="state"
                      value={formData[index].state}
                      onChange={(e) => handleChange(index, e)}
                      className=" rounded-md border placeholder:text-black bg-gray-200 border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Street Address"
                    />
                  </div>
                  <input
                    type="text"
                  name="city"
                  value={formData[index].city}
                  onChange={(e) => handleChange(index, e)}
                    className=" rounded-md placeholder:text-black bg-gray-200 border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="ZIP"
                  />
                </div>
                <div className="flex justify-between items-center mt-10">
                  <div className="">
                    <input
                      type="number"
                      name="phoneNumber"
                      value={formData[index].phoneNumber}
                      onChange={(e) => handleChange(index, e)}
                      className=" rounded-md placeholder:text-black bg-gray-200 border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter Your Phone Number"
                      required
                    />
                  </div>
                  <input
                    type="text"
                  name="distract"
                  value={formData[index].distract}
                  onChange={(e) => handleChange(index, e)}
                    className=" rounded-md border placeholder:text-black bg-gray-200 border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter Distract Name"
                    required
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${Number(order.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                Place Order
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
