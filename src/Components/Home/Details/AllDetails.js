import React from 'react';
import { Link } from 'react-router-dom';

const AllDetails = ({product}) => {
    const {image,name,price,_id} = product;
    const imageURL = `http://localhost:7000/images/${image}`;
    return (
        <div>
          <Link to={`/details/${_id}`}>
          <div className=" w-full bg-base-100 mx-auto">
          <figure className="">
            <img
              src={imageURL}
              alt="Shoes"
              className="h-60 w-72"
            />
          </figure>
          <div className="mx-2 text-start">
            <h2 className="card-title">{name}</h2>
            <p className="text-lg font-bold">$ {price}</p>
          </div>
        </div> 
          </Link>
           
        </div>
    );
};

export default AllDetails;