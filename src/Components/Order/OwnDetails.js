import React from 'react';

const OwnDetails = ({order}) => {
    const{productName,price}= order;
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {productName} 
                </th>
                <td class="px-6 py-4">
                    {price}
                </td>
                <td class="px-6 py-4">
                    Cash on Dalevary
                </td>
                <td class="px-6 py-4">
                    On the Way
                </td>
            </tr>
    );
};

export default OwnDetails;