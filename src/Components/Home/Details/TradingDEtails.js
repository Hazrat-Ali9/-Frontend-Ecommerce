import React from 'react';

const TradingDEtails = ({product}) => {
    const {name,img,price} = product
    return (
        <div>
           <div className=" w-full bg-base-100 mx-auto">
          <figure className="">
            <img
              src={img}
              alt="Shoes"
              className="h-48"
            />
          </figure>
          <div className="mx-2 text-start">
            <h2 className="card-title">{name}</h2>
            <div className="flex justify-between">
              <p className="text-md font-semibold">$ {price}</p>
              <p className="text-md font-semibold">$ 40</p>
            </div>
          </div>
        </div> 
        </div>
    );
};

export default TradingDEtails;