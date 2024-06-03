import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Vendor = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();


  const onSubmit = async (data, event) => {
    const url = `http://localhost:7000/product`;
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('image', data.image[0]);
    formData.append("email", user ? user.email || "" : "") 
    formData.append("category", data.category);
    formData.append("status", "pending");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log(result);
      toast("Product Submitted Wait For Admin Approval")
      navigate('/myRole');
      event.target.reset();
    } catch (error) {
      console.error('Error:', error);
     
    }
  };
 
  return (
    <div>
      <div class="min-h-screen flex justify-center items-center">
        <div class="lg:w-2/5 md:w-1/2 w-2/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="bg-white p-10 rounded-lg shadow-lg min-w-full"
          >
            <h1 class="text-center h-10 w-full bg-orange-600 text-lg text-white font-bold font-sans">
              প্রোডাক্ট আবেদন ফর্ম
            </h1>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="আপনার নাম"
              >
                আপনার নাম
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="userName"
                placeholder="আপনার নাম লিখুন"
                {...register("userName")}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Email
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="email"
                name="email"
                value={user ? user.email || "" : ""}
                {...register("email")}
                readOnly
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="আপনার নাম"
              >
                প্রোডাক্ট নাম
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="name"
                {...register("name")}
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="আপনার নাম"
              >
                Description
              </label>
              <textarea
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                placeholder="বিবরণ"
                type="text"
                {...register("description")}
              ></textarea>
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="Price"
              >
                Price
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                {...register("price")}
                placeholder="Price"
              />
            </div>
            <select {...register("category")} className="select w-full max-w-xs">
              <option disabled selected>
                প্রোডাক্ট ক্যাটাগরি সিলেক্ট করুন
              </option>
              <option>থ্রি-পিস</option>
              <option>Mobile Accessories</option>
              <option>চশমা</option>
              <option>ঘড়ি</option>
              <option>স্মার্ট ফোন</option>
              <option>টি-শার্ট</option>
              <option>জুতা</option>
              <option>শাড়ি</option>
              <option>শার্ট</option>
              <option>ল্যাপটপ</option>
              <option>পেন্ট</option>
              <option>ইলেকট্রনিক্স</option>
              <option>কিডস</option>
              <option>ডেস্কটপ</option>
              <option> কসমেটিক্স</option>
              <option>গিফট</option>
            </select>

            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="কয়েকটি প্রডাক্ট এর নাম "
              >
                প্রোডাক্ট সেম্পল ছবি 
              </label>
              <input
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                {...register("image")}
              />
            </div>

            <button
              type="submit"
              class="w-full mt-6 bg-orange-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              
            > আবেদন করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
