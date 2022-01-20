import React from 'react';

const CartItem = ({cart}) => {
    return (
        <table className='table table-bordered'>
            <thead className='thead-light'>
                <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
                <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
               {
                 cart.map((p)=>(
                    <tr className="table-light"  key={p._id}>
                    <td>image</td>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>{p.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>{p.shipping}</td>
                    <td>remove</td>
                </tr>
                 ))  
               }
             </tbody>
        </table>
   
    );
};

export default CartItem;