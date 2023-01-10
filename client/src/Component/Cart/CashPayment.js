import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createCashPayment, getCart, removeCart } from '../../common/user';

const CashPayment = () => {
    const dispatch=useDispatch();
    const{user,coupon,address}=useSelector((state)=>({...state}));
    const[succeeded,setSucceeded]=useState(false);
    const[error,setError]=useState(null);
    const[cashOn,setCashOn]=useState(false);
    const[cart,setCart]=useState([]);

    useEffect(()=>{
       getCart(user.token)
       .then((res)=>setCart(res.data.products))
       .catch((err)=>console.log(err));
    },[])

    const getTotal=()=>{
        return cart.reduce((f,s)=>{
           return f+s.count*s.price;
        },0)
       }
       
    const handleCash=(e)=>{
        e.preventDefault()
        if(!cart.length) {
          setError("cart is empty")
          return
        }
        setCashOn(true)
        createCashPayment(coupon,cashOn,address,user.token)
        .then((res)=>{
           console.log(res);
          if(res.status === 200){
            setSucceeded(true);
            if(typeof window !== undefined){
              localStorage.removeItem("cart")
            }
            dispatch({
              type:"ADD_TO_CART",
              payload:[]
            })  
            dispatch({
              type:"ADD_ADDRESS",
              payload:{}
            })
           removeCart(user.token)
          }
           if(res.data.err){
             console.log(res.data);
            setError(`payment failed ${res.data.err}`)
           }
         })
      }
      const handleTable=()=>(
        <table class="table">
        <thead className='thead-light'>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
                <th scope="col"></th>
           </tr>
     </thead>
          {
             cart.map((p)=>(
                 <tbody key={p._id}> 
                    <tr>
                        <td>{p.title}</td>
                        <td>${p.price}</td>
                        <td>=</td>
                        <td>${p.price*p.count}</td>
                    </tr> 
                 </tbody>  
                ))
             }
         <tbody>
            <tr>
                <td>Total Price</td>
                <td></td>
                <td>=</td>
                <td>${getTotal()}</td>
            </tr>
          </tbody>
    </table>
     )       
    return (
        <div style={{minHeight: "60vh"}} className='container'>
            <div className='row'>
             <div className='col-md-6 mt-5 pt-5'>
             <h4 className='text-center bg-secondary p-3 mb-5'>Order Summary</h4> 
               {handleTable()}
               <button onClick={handleCash} className='stripe-button'>
               <span id='button-text'>
                   Pay CashOn
               </span>
               </button>
               <div>
               
               {error?<div 
                style={{
                  alignItems:"center",
                  textAlign:"center",
                  justifyContent:"center",
                  color:"red",
                  textTransform:"uppercase",
                  marginTop: "15px"
                }}
                className='card-error' role="alert">{error}</div>:""}

               <p className={succeeded?"result-message":"result-message hidden"}>
                   Payment Successful.{" "}
                   <Link to="user/history">
                   See it in your purchase
                   </Link>
               </p>
               </div>
             </div>
         </div>
      </div> 
    );
};

export default CashPayment;