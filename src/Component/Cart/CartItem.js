import React from 'react';
import ModalImage from "react-modal-image";
import laptop from '../../image/laptop.jpg'
const CartItem = ({cart}) => {
    console.log(cart);
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
                    <td>
                        <div style={{width:"100px",height:"auto"}}>
                         {
                             p.images.length?  <ModalImage
                             small={p.images[0].url}
                             large={p.images.length>1?p.images[1].url:p.images[0].url}
                             />:
                             <ModalImage
                             small={laptop}
                             large={laptop}
                             />
                         }
                       </div>
                    </td>
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