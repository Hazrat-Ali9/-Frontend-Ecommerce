import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Role = () => {
  const [user] = useAuthState(auth);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', event.target.name.value);
    formData.append('email', user ? user.email || "" : "");
    formData.append('company', event.target.company.value);
    formData.append('district', event.target.district.value);
    formData.append('address', event.target.address.value);
    formData.append('image', image1);
    formData.append('image', image2);
    formData.append('role', role);
    formData.append('status', "pending");

    fetch("http://localhost:7000/user", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSubmitting(false);
        navigate("/myRole");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <form
            onSubmit={onSubmit}
            className="bg-white p-10 rounded-lg shadow-lg min-w-full"
          >
            <h1 className="text-center h-10 w-full bg-orange-600 text-lg text-white font-bold font-sans">
              ভেন্ডর আবেদন ফর্ম
            </h1>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                আপনার নাম
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="name"
                placeholder="আপনার নাম লিখুন"
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
                readOnly
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Role
              </label>
              <select>
              <option disabled selected>
               Select Your ROle
              </option>
              <option>vendor</option> 
              <option>affiliate</option>
              </select>
              <input
                type="text"
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                value={role}
                onChange={handleRoleChange}
                placeholder="ভুলি না"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                প্রতিষ্ঠান এর নাম
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="company"
                placeholder="প্রতিষ্ঠান এর নাম লিখুন"
              />
            </div>
            
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                আপনার জেলা সিলেক্ট করুন
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                name="district"
              >
               <option disabled selected>
                আপনার জেলা সিলেক্ট করুন
              </option>
              <option>গাজীপুর</option>
              <option>গোপালগঞ্জ</option>
              <option>টাঙ্গাইল</option>
              <option>ঢাকা</option>
              <option>নরসিংদী</option>
              <option>নারায়ণগঞ্জ</option>
              <option>ফরিদপুর</option>
              <option>মাদারিপুর</option>
              <option>মানিকগঞ্জ</option>
              <option>মুন্সিগঞ্জ</option>
              <option>রাজবাড়ী</option>
              <option>শরিয়তপুর</option>
              <option>কিশোরগঞ্জ</option>
              <option>কুমিল্লা</option>
              <option>ব্রাহ্মণবাড়িয়া</option>
              <option>চাঁদপুর</option>
              <option>লক্ষ্মীপুর</option>
              <option>নোয়াখালী</option>
              <option>ফেনী</option>
              <option>খাগড়াছড়ি</option>
              <option>রাঙ্গামাটি</option>
              <option>বান্দরবান</option>
              <option>চট্টগ্রাম</option>
              <option>কক্সবাজার</option>
              <option>চাঁপাইনবাবগঞ্জ</option>
              <option>জয়পুরহাট</option>
              <option>নওগাঁ</option>
              <option>নাটোর</option>
              <option>পাবনা</option>
              <option>বগুড়া</option>
              <option>রাজশাহী</option>
              <option>সিরাজগঞ্জ</option>
              <option>খুলনা</option>
              <option>চুয়াডাঙ্গা</option>
              <option>ঝিনাইদহ</option>
              <option>নড়াইল</option>
              <option>বাগেরহাট</option>
              <option>কুষ্টিয়া</option>
              <option>মাগুরা</option>
              <option>মেহেরপুর</option>
              <option>যশোর</option>
              <option>সাতক্ষীরা</option>
              <option>বরিশাল</option>
              <option>পটুয়াখালী</option>
              <option>ভোলা</option>
              <option>পিরোজপুর</option>
              <option>বরগুনা</option>
              <option>ঝালকাঠি</option>
              <option>সিলেট</option>
              <option>মৌলভীবাজার</option>
              <option>হবিগঞ্জ</option>
              <option>সুনামগঞ্জ</option>
              <option>কুড়িগ্রাম</option>
              <option>গাইবান্ধা</option>
              <option>ঠাকুরগাঁও</option>
              <option>দিনাজপুর</option>
              <option>নীলফামারী</option>
              <option>পঞ্চগড়</option>
              <option>রংপুর</option>
              <option>লালমনিরহাট</option>
              <option>ময়মনসিংহ</option>
              <option>জামালপুর</option>
              <option>নেত্রকোনা</option>
              <option>শেরপুর</option>
            </select>
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                প্রতিষ্ঠান এর ঠিকানা
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="address"
                placeholder="প্রতিষ্ঠান এর ঠিকানা"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                আপনার ছবি
              </label>
              <input
                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                type="file"
                onChange={handleImage1Change}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                আপনার এন আই ডি
              </label>
              <input
                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                type="file"
                onChange={handleImage2Change}
              />
            </div>
            <div className="flex justify-start">
              <label className="block text-gray-500 font-bold my-4 flex items-center">
                <input
                  className="leading-loose text-pink-600 top-0"
                  type="checkbox"
                />
                <span className="ml-2 text-sm py-2 text-gray-600 text-left">
                  <a
                    href="#"
                    className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
                  >
                    আমি এতদ্বারা ঘোষনা করছি যে, উপরের সমস্থ তথ্য সঠিক এবং
                  </a>
                  <span className="font-semibold text-orange-600 mx-2">
                    সেল্ফ ভেন্ডরশিপ নীতিমালার
                  </span>
                  <span className="text-black">সাথে একমত পোষন করলাম !!!</span>
                </span>
              </label>
            </div>
            <button
              className="mt-6 block w-full select-none rounded-lg bg-orange-600 py-3 px-6 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Apply Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Role;
