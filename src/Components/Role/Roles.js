import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Roles = () => {
const navigate = useNavigate();
const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');

  const [role, setRole] = useState('');
  const [image, setImage] = useState(null)
  const [images, setImages] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', user ? user.email || "" : "");
    formData.append('company', company);
    formData.append('address', address);
    formData.append('district', district);
    formData.append('role', role);       
    formData.append('status', "pending");
  
    if (image) {
      formData.append('images', image);
    }
    if (images) {
      formData.append('images', images);
    }
  
    try {
      await axios.post('http://localhost:7000/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/allrole")
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
    return (
        <div>
            <form className="mt-6"onSubmit={handleSubmit}>
          
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Name
            </label>
            <input
              type="text"
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Input Product Name"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              
            />
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Role
              </label>
              <select
  name='role'
  value={role} onChange={(e) => setRole(e.target.value)}
>
              <option>
               Select Your Role
              </option>
              <option value="vendor">vendor</option> 
              <option value="affiliate">affiliate</option>
              </select>
            </div>
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              email
            </label>
            <input
              type="text"
              value={user ? user.email || "" : ""} onChange={() => setEmail(user.email)}
             
                readOnly
              placeholder="Input Category"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
             
            />
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Address
            </label>
            <input
              type="text"
              value={address} onChange={(e) => setAddress(e.target.value)}
              placeholder="Input Product Name"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              
            />
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              company
            </label>
            <input
              type="text"
              value={company} onChange={(e) => setCompany(e.target.value)}
              placeholder="Input Product Name"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              
            />
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                আপনার জেলা সিলেক্ট করুন
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                name="district"
                value={district} onChange={(e) => setDistrict(e.target.value)}
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
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Image
            </label>
            <input
              type="file" 
              onChange={(e) => setImage(e.target.files[0])}
            
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
             
            />
            <input
              type="file" 
              onChange={(e) => setImages(e.target.files[0])}
            
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
             
            />
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            >
             Add Now
            </button>
            
          </form>
        </div>
    );
};

export default Roles;