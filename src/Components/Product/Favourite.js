import React from 'react';
import useProduct from '../../Hook/useProduct';
import FavouriteDetil from './Details/FavouriteDetil';

const Favourite = () => {
    const [products] = useProduct();

  return (
    <div className="mx-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 gap-y-6">
        {products
          .filter((product) => product.type === "favoriteProduct")
          .map((product) => (
            <FavouriteDetil key={product.id} product={product} />
          ))}
      </div>
    </div>
    );
};

export default Favourite;