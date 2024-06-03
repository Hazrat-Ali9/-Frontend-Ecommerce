import React from 'react';

const LpgDetails = ({product}) => {
    const {name,price,image} = product;
    const imageURL = `http://localhost:7000/images/${image}`;
    return (
        <div>
          <div className=" w-full bg-base-100 mx-auto">
          <figure className="">
            <img
              src={imageURL}
              alt="Shoes"
              className="h-48"
            />
          </figure>
          <div className="mx-2 text-start">
            <h2 className="card-title">{name}</h2>
            <p>$ {price}</p>
            <div className="mt-5">
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-md px-4 py-2 text-center inline-flex items-center dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-3.5 h-3.5 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                Buy now
              </button>
            </div>
          </div>
        </div>  
        </div>
    );
};

export default LpgDetails;