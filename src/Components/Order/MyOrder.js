import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const [user] = useAuthState(auth);
  const [carts, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [vat, setVat] = useState(0);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:7000/cart/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const ordersWithQuantity = data.map((order) => ({
            ...order,
            quantity: 1,
          }));
          setCart(ordersWithQuantity);
        });
    }
  }, [user]);

  useEffect(() => {
    calculateTotalPrice();
  }, [carts, selectedOrderIds]);

  const calculateTotalPrice = () => {
    const selectedOrders = carts.filter((cart) =>
      selectedOrderIds.includes(cart._id)
    );
    const subtotal = selectedOrders.reduce(
      (total, order) => total + order.price * order.quantity,
      0
    );
    const shippingCharge = subtotal * 0.05;
    const vat = subtotal * 0.07;
    const grandTotal = subtotal + shippingCharge + vat;

    setSubtotal(subtotal);
    setShippingCharge(shippingCharge);
    setVat(vat);
    setTotalPrice(grandTotal);
  };

  const updateOrderQuantity = (orderId, newQuantity) => {
    setCart((prevCarts) =>
      prevCarts.map((cart) =>
        cart._id === orderId ? { ...cart, quantity: newQuantity } : cart
      )
    );
  };

  const toggleSelectOrder = (orderId) => {
    setSelectedOrderIds((prevSelectedOrderIds) => {
      if (prevSelectedOrderIds.includes(orderId)) {
        return prevSelectedOrderIds.filter((id) => id !== orderId);
      } else {
        return [...prevSelectedOrderIds, orderId];
      }
    });
  };

  const handleCheckout = () => {
    const selectedOrders = carts.filter((cart) => selectedOrderIds.includes(cart._id));
    navigate("/checkout", { state: { selectedOrders, totalPrice, email: user.email } });
  };

  return (
    <div>
      <h1>My Orders {carts.length}</h1>
      <section className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>
          <div>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                <div className="bg-white shadow">
                  {carts.map((order) => (
                    <OrderDetails
                      key={order._id}
                      order={order}
                      updateOrderQuantity={updateOrderQuantity}
                      isSelected={selectedOrderIds.includes(order._id)}
                      onSelect={() => toggleSelectOrder(order._id)}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center px-10">
                  <h1 className="text-base font-semibold text-gray-900">Sub Total:</h1>
                  <h1 class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${subtotal.toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center px-10">
                  <h1 className="text-base font-semibold text-gray-900">Shipping Charge:</h1>
                  <h1 class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${shippingCharge.toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center px-10">
                  <h1 className="text-base font-semibold text-gray-900">Vat:</h1>
                  <h1 class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${vat.toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center px-10">
                  <h1 className="text-base font-semibold text-gray-900">Grand Total:</h1>
                  <h1 class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${totalPrice.toFixed(2)}</h1>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleCheckout}
                    className="btn group inline-flex w-96 items-center justify-center rounded-md bg-gray-900 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrder;
