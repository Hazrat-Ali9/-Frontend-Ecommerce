import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Condition from "./Components/Home/Condition";
import Nav from "./Components/Home/Nav";
import About from "./Components/Home/About";
import Privacy from "./Components/Home/Privacy";
import Contract from "./Components/Home/Contract";
import Login from "./Components/Authentication/Login";
import Footer from "./Components/Home/Footer";
import NewProduct from "./Components/Product/NewProduct";
import Exclusive from "./Components/Product/Exclusive";
import Favourite from "./Components/Product/Favourite";
import Most from "./Components/Product/Most";
import Popular from "./Components/Product/Popular";
import Special from "./Components/Product/Special";
import Trading from "./Components/Product/Trading";
import Stg from "./Components/Product/Stg";
import AllDetails from "./Components/Details/AllDetails";
import MoreDetails from "./Components/Details/MoreDetails";
import Search from "./Components/Search/Search";
import Register from "./Components/Authentication/Register";
import Admin from "./Components/Dashboard/Admin";
import Vendor from "./Components/Dashboard/Vendor";
import User from "./Components/Dashboard/User";
import Approved from "./Components/Admin/Approved";
import { useState } from "react";
import Order from "./Components/Order/Order";
import MyOrder from "./Components/Order/MyOrder";
import Role from "./Components/Role/Role";
import MyRole from "./Components/Role/MyRole";
import Category from "./Components/Product/Category";
import AllProduct from "./Components/Product/AllProduct";
import Roles from "./Components/Role/Roles";
import AllRoles from "./Components/Role/AllRoles";
import Update from "./Components/Role/Update";
import MyProduct from "./Components/Role/MyProduct";
import Discount from "./Components/Product/Discount";
import AllAdminProduct from "./Components/Admin/AllAdminProduct";
import AdminUpdate from "./Components/Admin/AdminUpdate";
import Favorite from "./Components/Favorite/Favorite";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CountDown from "./Components/Favorite/CountDown";
import Reg from "./Components/Authentication/Reg";
import Checkout from "./Components/Checkout/Checkout";
import OwnOrders from "./Components/Order/OwnOrders";
import Verify from "./Components/Authentication/Verify";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [startCountdown, setStartCountdown] = useState(false);

  const handleStartCountdown = () => {
    setStartCountdown(prevStartCountdown => !prevStartCountdown); // Toggle countdown start
  };

  return (
    <div>
       
      <Router>
        <Nav loggedInUser={loggedInUser} />
        <div className="flex flex-col lg:flex-row bg-white max-w-screen-2xl mx-auto">
          <div className="md:flex h-80 lg:w-1/6 w-full bg-gray-300 border-r hidden">
            <div className="mx-auto py-10">
              <ul>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/">হোম</Link>
                </li>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/all">All</Link>
                </li>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/about">আমাদের সম্পর্কে </Link>
                </li>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/privacy">গোপনীয়তা নীতি</Link>
                </li>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/condition">টার্ম কন্ডিশন </Link>
                </li>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/contract">যোগাযোগ</Link>
                </li>
                <li className="flex space-x-2 cursor-pointer text-black hover:text-[#EC5252] duration-150 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <Link to="/login">লগইন / রেজিস্ট্রেশন</Link>
                </li>
              </ul>
            </div>
          </div>
          <main className="min-h-screen w-full max-w-screen-2xl mx-auto lg:border-l lg:w-5/6">
            <Routes>
              <Route path="/" element={<Home startCountdown={startCountdown}/>} />
              <Route path="/all" element={<AllProduct />} />
              <Route path="/condition" element={<Condition />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<Verify/>}/>
              <Route path="/admin" element={<Admin />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/user" element={<User />} />
              <Route path="/new" element={<NewProduct />} />
              <Route path="/exclusive" element={<Exclusive />} />
              <Route path="/favorite" element={<Favourite />} />
              <Route path="/most" element={<Most />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/special" element={<Special />} />
              <Route path="/trend" element={<Trading />} />
              <Route path="/stg" element={<Stg />} />
              <Route path="/search" element={<Search />} />
              <Route path="/details/:id" element={<AllDetails />} />
              <Route path="/more/:id" element={<MoreDetails />} />
              <Route path="/approved" element={<Approved onStart={handleStartCountdown}/>} />
              <Route path="/adminAll" element={<AllAdminProduct />} />
              <Route path="/adminUpdate/:id" element={<AdminUpdate />} />
              <Route path="/myOrder" element={<MyOrder />} />
              <Route path="/myRole" element={<MyRole />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/favorites/" element={<Favorite />} />
              <Route path="/role" element={<Role />} />
              <Route path="/discount" element={<Discount />} />
              <Route path="/roles" element={<Roles/>} />
              <Route path="/myProduct" element={<MyProduct/>} />
              <Route path="/category/:name" element={<Category />} />
              <Route path="/count" element={<CountDown/>} />
              <Route path="/checkout" element={<Checkout/>} />
              <Route path="/own" element={<OwnOrders/>} />
            </Routes>
          </main>
        </div>
        <ToastContainer />
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
