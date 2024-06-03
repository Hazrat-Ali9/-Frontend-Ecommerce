import React from 'react';

const NewDetails = ({product}) => {
const {name,price,image} = product;
const imageURL = `http://localhost:7000/images/${image}`;
    return (
        <div>
            <div className=" w-full bg-base-100 mx-auto">
          <figure className="">
            <img
              src={imageURL}
              alt="Shoes"
              className="h-60"
            />
          </figure>
          <div className="mx-2 text-start">
            <h2 className="card-title">{name}</h2>
            <p className="text-lg font-bold">$ {price}</p>
          </div>
        </div>
        </div>
    );
};

export default NewDetails;