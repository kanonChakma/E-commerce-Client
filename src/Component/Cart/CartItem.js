import React, { useState } from 'react';
import ModalImage from "react-modal-image";
import { useDispatch } from 'react-redux';
import laptop from '../../image/laptop.jpg'

const CartItem = ({product}) => {  
    let colors=["Black","Brown","Silver","White","Blue"];
    const dispatch=useDispatch();

    const handleSelect=(e)=>{
    
        let cart=[];

        if(typeof window !== "undefined"){
          if(localStorage.getItem("cart")){
             cart=JSON.parse(localStorage.getItem("cart"))
           }
        cart.map((p,i)=>{
          if(p._id===product._id){
               cart[i].color=e.target.value;
            }
          })
          localStorage.setItem("cart",JSON.stringify(cart));
          dispatch({
              type:"ADD_TO_CART",
              payload:cart
           })
         }
    }
    return (
            <tbody>
                 <tr className="table-light">
                    <td>
                        <div style={{width:"100px",height:"auto"}}>
                         {
                             product.images.length?  <ModalImage
                             small={product.images[0].url}
                             large={product.images.length>1?product.images[1].url:product.images[0].url}
                             />:
                             <ModalImage
                             small={laptop}
                             large={laptop}
                             />
                         }
                       </div>
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.brand}</td>
                    <td>
                        <select 
                        className='form-control'
                        name='color'
                        onChange={handleSelect}>
                            {
                             product.color?<option>{product.color}</option>:<option>select</option>
                            }
                            {
                               colors.filter((c)=>c!==product.color).map((p)=>(
                                 <option  value={p} key={p._id}>{p}</option>
                              ))
                            }
                        </select>
                     </td>
                     <td>{product.count}</td>
                     <td>{product.shipping}</td>
                     <td>remove</td>
                </tr>
             </tbody>
   
    );
};

export default CartItem;