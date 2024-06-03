import React, { useEffect, useState } from "react";
import OwnDetails from "./OwnDetails";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import { Link } from "react-router-dom";

const OwnOrders = () => {
  const [orders, setOrder] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/order/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrder(data));
    }
  }, [user]);

  const email = user?.email;
  const rest = orders.filter((order) => order.email === email);
  return (
    <div>
      <div class="relative px-20 overflow-x-auto mt-10">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Payment Type
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              Array.isArray(orders) &&
              orders.map((order) => (
                <OwnDetails key={order._id} order={order} />
              ))}
          </tbody>
        </table>
      </div>
      <Link to="/role">Apply for Role</Link>
    </div>
  );
};

export default OwnOrders;
