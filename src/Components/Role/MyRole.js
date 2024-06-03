import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import MyProductDetails from "./MyProductDetails";

const MyRole = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/product/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [user]);

  return (
    <div className="mx-10">
      <h1>My Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-5">
        {posts.map((post) => (
          <MyProductDetails key={post._id} post={post} />
        ))}
      </div>
      <div className="text-center">
        <Link to="/vendor">
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Post Product
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyRole;
