import React from "react";

const OrderDetails = ({ order, updateOrderQuantity, isSelected, onSelect }) => {
  const { productName, price, image, quantity, _id } = order;
  const imageURL = `http://localhost:7000/images/${image}`;
  const handleIncrease = () => {
    updateOrderQuantity(_id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateOrderQuantity(_id, quantity - 1);
    }
  };
  return (
    <div>
      
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0 relative">
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={onSelect}
                        className="absolute top-1 left-1"
                      />
                      <img
                        className="h-24 w-24 max-w-full rounded-lg object-cover"
                        src={imageURL}
                        alt={productName}
                      />
                    </div>
                    <div class="relative flex flex-1 flex-col justify-between">
                      <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div class="pr-8 sm:pr-5">
                          <p className="text-base font-semibold text-gray-900">
                            {productName}
                          </p>
                        </div>

                        <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                            ${(price * quantity).toFixed(2)}
                          </p>

                          <div class="sm:order-1">
                            <div class="mx-auto flex h-8 items-stretch text-gray-600">
                              <button
                                onClick={handleDecrease}
                                class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              >
                                -
                              </button>
                              <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                {quantity}
                              </div>
                              <button
                                onClick={handleIncrease}
                                class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button
                          type="button"
                          class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                        >
                          <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                              class=""
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
    </div>
  );
};

export default OrderDetails;
