import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const AllDetails = () => {
  const { id } = useParams();
    const [service, setService] = useState({});

    useEffect(() => {
        const url = `http://localhost:7000/product/${id}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data));

    }, [id])
  return (
    <div class="mx-5">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2">
        <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
          <div className="relative">
              {service.image && <img className="object-cover w-72 h-72" src={`http://localhost:7000/images/${service.image}`} alt="Product" />}
          </div>
        </div>
        <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
          <div className="relative">
            <div className="grid grid-cols-4 md:grid-cols-4 gap-5">
            {service.image && <img className="object-cover h-28 w-32"src={`http://localhost:7000/images/${service.image}`} alt="Product" />}
            {service.image && <img className="object-cover h-28 w-32"src={`http://localhost:7000/images/${service.image}`} alt="Product" />}
            {service.image && <img className="object-cover h-28 w-32"src={`http://localhost:7000/images/${service.image}`} alt="Product" />}
            {service.image && <img className="object-cover h-28 w-32"src={`http://localhost:7000/images/${service.image}`} alt="Product" />}
            </div>
            <div className="flex justify-between px-3 mt-5">
            <h1 className="text-2xl font-bold text-red-500 ">{service.name}</h1>
            <Link to={`/more/${id}`}><button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-orange-500 border border-gray-200 hover:text-white dark:bg-orange-600 dark:text-white">Buy Now</button></Link>
            
            </div>
            <h1 className="text-md text-start px-3">Product Code : xjhd35466</h1>
          </div>
         
        </div>
      </div>
    </div>

</div>

  );
};

export default AllDetails;
