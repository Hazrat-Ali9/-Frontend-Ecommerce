import React from 'react';

const NewHome = ({product}) => {
    const {name,image,price}=product;
    const imageURL = `http://localhost:7000/images/${image}`;
    return (
        <div>
           <div className=" w-full bg-base-100 mx-auto">
          <figure className="">
            <img
              src={imageURL}
              alt="Shoes"
              className="h-40"
            />
          </figure>
          <div className="mx-2 text-start">
            <h2 className="card-title">{name}</h2>
            <p>$ {price}</p>
          </div>
        </div> 
        </div>
    );
};

export default NewHome;