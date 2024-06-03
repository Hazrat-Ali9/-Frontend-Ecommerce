import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Approved = ({ onStart }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleStart = () => {
    onStart(true);
    navigate("/");
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const response = await fetch("http://localhost:7000/product");
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Filter products based on status
        const pendingProducts = data.filter(
          (product) => product.status === "pending"
        );
        setProducts(pendingProducts);
      } else {
        console.error("Failed to fetch pending products");
      }
    } catch (error) {
      console.error("Error fetching pending products:", error);
    }
  };

  const approveProduct = (productId) => {
    fetch(`http://localhost:7000/product/${productId}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setProducts(
          products.map((product) => {
            if (product._id === productId) {
              return { ...product, status: "approved" };
            }
            return product;
          })
        );
        navigate("/all") // Navigate to the desired location
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const rejectProduct = (productId) => {
    fetch(`http://localhost:7000/product/${productId}/reject`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProducts(
          products.map((product) => {
            if (product._id === productId) {
              return { ...product, status: "rejected" };
            }
            return product;
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:7000/user");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const pendingRules = data.filter((role) => role.status === "pending");
        setRoles(pendingRules);
        setLoading(false);
      } else {
        console.error("Failed to fetch pending products");
      }
    } catch (error) {
      console.error("Error fetching pending products:", error);
    }
  };

  const approveRole = (roleId, newRole) => {
    fetch(`http://localhost:7000/user/${roleId}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setRoles(
          roles.map((role) => {
            if (role._id === roleId) {
              return { ...role, status: "approved" };
            }
            return role;
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const rejectRole = (roleId) => {
    fetch(`http://localhost:7000/user/${roleId}/reject`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setRoles(
          roles.map((role) => {
            if (role._id === roleId) {
              return { ...role, status: "rejected" };
            }
            return role;
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-10">
      <h2 className="text-2xl font-bold text-center mt-5">Admin Approval</h2>
      <h1 className="text-xl font-bold text-center mt-5">Pending Role</h1>
      {roles.map((role) => (
        <div className="container grid grid-cols-1 md:grid-cols-3 mx-auto px-5">
          {role.status === "pending" && (
            <div class="w-80 bg-white shadow-lg rounded-lg overflow-hidden my-4">
              <div className="flex justify-between mx-auto gap-5">
                <img
                  className="w-32 h-40 object-cover object-center"
                  src={`http://localhost:7000/uploads/${role.image1}`}
                  alt="image1"
                />
                <img
                  className="w-32 h-40 object-cover object-center"
                  src={`http://localhost:7000/uploads/${role.image2}`}
                  alt="image2"
                />
              </div>
              <div class="py-4 px-6">
                <h1 class="text-xl text-center font-semibold text-gray-800">
                  {role.name}
                </h1>
                <h1 class="text-md text-center font-semibold text-gray-800">
                  Apply For {role.role}
                </h1>
                <div class="flex items-center mt-4 text-gray-700">
                  <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
                    <g>
                      <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
                    </g>
                  </svg>
                  <h1 class="px-2 text-sm">Company: {role.company}</h1>
                </div>
                <div class="flex items-center mt-4 text-gray-700">
                  <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                  </svg>
                  <h1 class="px-2 text-sm">District : {role.district}</h1>
                </div>
                <div class="flex items-center mt-4 text-gray-700">
                  <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
                  </svg>
                  <h1 class="px-2 text-sm">{role.email}</h1>
                </div>
                <h1 class="px-2 text-sm">Status: {role.status}</h1>
                <p class="py-2 text-sm font-semibold text-gray-700">
                  Address : {role.address}
                </p>
                <div className="flex justify-between mx-auto">
                  <button
                    onClick={() => approveRole(role._id, role.role)}
                    className="btn btn-circle bg-green-600"
                  >
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                        fill="white"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => rejectRole(role._id)}
                    className="btn btn-circle btn-outline bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <h1 className="text-xl font-bold text-center mt-5">Pending Products</h1>
      <div className="container grid grid-cols-1 md:grid-cols-3 mx-auto gap-10">
      {products.map((product) => (
        <div
          key={product._id}
        >
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-48 h-48 mt-5 shadow-lg"
                src={`http://localhost:7000/images/${product.image}`}
                alt="Bonnie"
              />
              <h5 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                Product Name : {product.name}
              </h5>
              <span class="text-md text-white">
                User Name : {product.userName}
              </span>
              <span class="text-md text-white">Email : {product.email}</span>
              <span class="text-md text-white">
                Category : {product.category}
              </span>
              <span class="text-md text-white">Price : {product.price}</span>
              <span class="text-md text-white">Status : {product.status}</span>
              <div class="flex justify-between gap-10 mt-4 md:mt-6">
                <button
                  onClick={() => approveProduct(product._id)}
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectProduct(product._id)}
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
      
      <button onClick={handleStart}>Start Countdown</button>
      {/* <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - Status: {product.status}
            {product.status === "pending" && (
              <>
                <button onClick={() => approveProduct(product._id)}>
                  Approve
                </button>
                <button onClick={() => rejectProduct(product._id)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Reject
                </button>
              </>
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Approved;
