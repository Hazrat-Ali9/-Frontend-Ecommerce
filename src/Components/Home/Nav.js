import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
const Nav = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [user, userLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/favorite/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data));
    }
  }, [user]);

  const emails = user?.email;
  const rests = favorites.filter((favorite) => favorite.email === emails);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/cart/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [user]);

  const email = user?.email;
  const rest = orders.filter((order) => order.email === email);
  useEffect(() => {
    if (user) {
      fetchUserRole(user.email);
    }
  }, [user]);

  const fetchUserRole = async (email) => {
    try {
      const adminResponse = await fetch(`http://localhost:7000/admin/${email}`);
      const adminData = await adminResponse.json();
      setIsAdmin(adminData.admin);

      const vendorResponse = await fetch(
        `http://localhost:7000/vendor/${email}`
      );
      const vendorData = await vendorResponse.json();
      setIsVendor(vendorData.vendor);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">হোম</Link>
              </li>
              <li>
                <Link to="/all">All</Link>
              </li>
              <li>
                <Link to="/about">আমাদের সম্পর্কে </Link>
              </li>
              <li>
                <Link to="/privacy">গোপনীয়তা নীতি</Link>
              </li>
              <li>
                <Link to="/condition">টার্ম কন্ডিশন </Link>
              </li>
              <li>
                <Link to="/contract">যোগাযোগ</Link>
              </li>
              <li>
                <Link to="/login">লগইন</Link>
              </li>
              <li>
                <Link to="/register"> রেজিস্ট্রেশন</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">E-Commerce</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li>
                <a>Home</a>
              </li>
            </Link>
            <form onSubmit={handleSubmit} class="max-w-md mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <input
                  value={query}
                  onChange={handleChange}
                  type="search"
                  id="default-search"
                  class="block w-full p-3 ps-20 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/favorites">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    className="h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                      fill="red"
                    ></path>
                  </svg>

                  <span className="badge badge-sm indicator-item">
                    {rests.length}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/myOrder">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {rest.length}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-14 rounded-full">
                <img
                  alt="user"
                  src="https://ps.w.org/cbxuseronline/assets/icon-256x256.png?rev=2284897"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              {user ? (
                <div className="navbar-end">
                  {isAdmin ? (
                    <Link to="/approved">
                      <li>
                        <a className="btn btn-ghost text-md">Admin Dashboard</a>
                      </li>
                    </Link>
                  ) : isVendor ? (
                    <Link to="/myRole">
                      <li>
                        <a className="btn btn-ghost text-md">
                          Vendor Dashboard
                        </a>
                      </li>
                    </Link>
                  ) : (
                    <Link to="/own">
                      <li>
                        {" "}
                        <a className="btn btn-ghost text-md">My Order</a>
                      </li>
                    </Link>
                  )}
                  <div className="flex gap-5 px-5 mt-3">
                    <li>
                      <a onClick={logout} className="btn text-sm">
                        Log Out
                      </a>
                    </li>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn">
                  Login
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
