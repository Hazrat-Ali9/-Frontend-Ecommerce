import React from "react";
import { Link } from "react-router-dom";

const AdminDEtails = ({ product }) => {
  const { _id, name, price } = product;
  return (
      <tr>
       
        <td>{name}</td>
        <td>{price}</td>
        <td>
        <Link to={`/adminUpdate/${_id}`}>
          <button class="btn btn-xs">Update</button>
        </Link>
          <button class="btn btn-xs">Delate</button>
        </td>
      </tr> 
  );
};

export default AdminDEtails;
