import React from 'react';

const PopularDetails = ({product}) => {
    const {name,img} = product
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
          </div>
        </div>
        </div>
    );
};

export default PopularDetails;