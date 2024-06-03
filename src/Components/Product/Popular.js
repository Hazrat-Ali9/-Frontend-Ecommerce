import React from 'react';
import useProduct from '../../Hook/useProduct';
import NewDetails from './Details/NewDetails';

const Popular = () => {
    const [products] = useProduct();

  return (
    <div className="mx-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 gap-y-6">
        {products
          .filter((product) => product.type === "popularProduct")
          .map((product) => (
            <NewDetails key={product.id} product={product} />
          ))}
      </div>
    </div>
    );
};

export default Popular;