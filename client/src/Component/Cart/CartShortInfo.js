import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const CartShortInfo = ({product}) => {  
    let colors=["Black","Brown","Silver","White","Blue"];
    const dispatch=useDispatch();

    const handleSelect=(e)=>{
    
        let cart=[];

        if(typeof window !== "undefined") {
          if(localStorage.getItem("cart")) {
             cart=JSON.parse(localStorage.getItem("cart"))
           }
        cart.map((p,i) => {
          if(p._id===product._id) {
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

    const handleChangeCount=(e)=>{

        let count=e.target.value<1?1:e.target.value;
        if(count>product.quantity){
            toast.error("Product Quantity exist")
            return;
        }
        let cart=[];
        if(typeof window !== "undefined"){
            if(localStorage.getItem("cart")){
                cart=JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((p,i)=> {
                if(p._id === product._id){
                 cart[i].count=count;
                }
            })
            localStorage.setItem("cart",JSON.stringify(cart));
            dispatch({
                type:"ADD_TO_CART",
                payload:cart
            })
        }
    }
   const handleRemove=()=>{
    let cart=[];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((p,i)=>{
            if(p._id === product._id){
             cart.splice(i,1);
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
                    <td>{product.title}</td>
                    <td>{product.price}</td>
            
                     <td className='text-center'>
                          <input 
                             type='number' 
                             className='form-control text-center Width' 
                             value={product.count}
                             onChange={handleChangeCount}
                          />
                         </td>
                     <td className='text-center'>
                         <CloseOutlined className='text-danger Pointer' onClick={handleRemove}/>
                     </td>
                </tr>
             </tbody>
    );
};

export default CartShortInfo;