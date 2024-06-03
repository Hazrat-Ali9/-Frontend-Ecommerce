import React from 'react';

const UserRow = ({user,refetch}) => {
    const {email,role}=user
    const makeAdmin = () => {
        fetch(`http://localhost:7000/user/admin/${email}`, {
            method: 'PUT',
            
        })
            .then(res => {
                if(res.status === 403){
                   
                }
                return res.json()})
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    
                }
            })
    }
    return (
        <div>
           <tr>
        <th>1</th>
        <td>{email}</td>
        <td>{role !== 'admin' &&<button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
        <td><button class="btn btn-xs">Remove Admin</button></td>
      </tr> 
        </div>
    );
};

export default UserRow;