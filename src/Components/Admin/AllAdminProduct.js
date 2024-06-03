import React from 'react';
import useProduct from '../../Hook/useProduct';
import AdminDEtails from './AdminDEtails';

const AllAdminProduct = () => {
    const [products] = useProduct()
   
    return (
        <div>
            <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <thead>
            <tr>
              <th className='text-xl font-bold text-black'>Name</th>
              <th className='text-xl font-bold text-black'>Price</th>
              <th className='text-xl font-bold text-black'>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
                products.map((product)=>
                    <AdminDEtails
                    key={product._id}
                    product={product}
                    />
                )
            }
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default AllAdminProduct;