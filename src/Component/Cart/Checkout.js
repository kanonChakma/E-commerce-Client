import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCart, removeCart } from '../../common/cart';
import OrderSummary from './OrderSummary';

const Checkout = () => {
    const{user}=useSelector((state)=>({...state}))
    const[cart,setCart]=useState([]);
    const dispatch=useDispatch();

    useEffect(()=>{
       getCart(user.token)
       .then((res)=>setCart(res.data.products))
       .catch((err)=>console.log(err));
    },[])
    const handleSaveAdress=()=>{

    }
    const handleEmpty=()=>{
        if(typeof window!== "undefined"){
           localStorage.removeItem("cart") 
        }
        dispatch({
            type:"ADD_TO_CART",
            payload:[]
        })
        removeCart(user.token)
        .then((res)=>{
          console.log(res.data);
          setCart([])
          toast.success("Cart is deleted.Continue Shopping...")
        })
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6'>
                    <h4>Delivary Adress</h4>   
                     <button className='btn btn-primary mt-2' onClick={handleSaveAdress}>
                         Save
                     </button> 
                </div>
                <div className='col-md-6'>
                    <h4>Order Summary</h4>
                  <OrderSummary cart={cart}/>
                   
                  <div className='row'>
                     <div className='col-md-6'>
                     <button className='btn btn-primary'>
                        PLACE ORDER
                     </button>
                     </div>
                     <div className='col-md-6'>
                        <button disabled={!cart.length}  onClick={handleEmpty} className='btn btn-primary'>
                            EMPTY CART
                        </button>
                     </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;