import { CheckOutlined, DollarOutlined } from '@ant-design/icons';
import {
  CardElement, useElements, useStripe
} from '@stripe/react-stripe-js';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreatePaymentIntents } from "../../common/stripe";
import { createOrder, removeCart } from '../../common/user';
import laptop from "../../image/laptop.jpg";

const CheckoutForm = () => {
  
  const dispatch=useDispatch();
  const{user,coupon,address}=useSelector((state)=>({...state}));
  const history = useHistory();
  const[succeeded,setSucceeded]=useState(false);
  const[error,setError]=useState(null);
  const[processing,setProcessing]=useState(false)
  const[disabled,setDisabled]=useState(true);
  const[clientSecret,setClientSecret]=useState("");

  const[cartTotal,setCartTotal]=useState(0);
  const[totalAfterDiscount,setTotalAfterDiscount]=useState(0);
  const[totalPayable,setTotalPayable]=useState(0);
  const[cashOn,setCashOn]=useState(false);

  const stripe = useStripe();
  const elements = useElements();
 
  useEffect(()=>{
    CreatePaymentIntents(user.token,coupon)
    .then((res)=>{
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setTotalPayable(res.data.paymentTotal);
        setClientSecret(res.data.clientSecret);
    })
  },[]) 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true)

    const payload=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:elements.getElement(CardElement),
        billing_details:{
          name:event.target.name.value,
        },
      },
    });
    console.log(payload);
    if(payload.error){
      setError(`payment failed ${payload.error.type}`)
      setProcessing(false);
    }else{
      createOrder(address,payload.paymentIntent,user.token)
      .then((res)=>{
        if(res.data.status){
           if(typeof window !== undefined){
             localStorage.removeItem("cart")
           }
           dispatch({
             type:"ADD_TO_CART",
             payload:[]
           })  
           dispatch({
             type:"APPLY_COUPON",
             payload:false
           })
          removeCart(user.token)
         }
      })
      setProcessing(false);
      setSucceeded(true);
      setError(null);
      history.push("/payment/successfull")
    }
  };
  const handleChange=async(e)=>{
     setDisabled(e.empty);
     setError(e.error?e.error.message:"")
  }
  const cartStyle={
      style:{
        base:{
            color:"#32325d",
            fontFamily:"Arial,sans-serif",
            fontSmoothing:"antialiased",
            fontSize:"16px",
            "::placeholder":{
                color:'#32325d'
            },
        },
       invalid:{
           color:"#fa755a",
           iconColor:"#fa755a",
        } 
      }
  }

  //------------CASH PAYMENT------------
  return (
    <>
     {!succeeded && <div>
        {coupon && totalAfterDiscount !== undefined?(
         <p className='alert alert-success'>{`Total after discount ${totalAfterDiscount}`}</p>
        ):(
        <p className='alert alert-danger'>No coupon applied</p>
        )}
      </div>}
      <Card
      cover={
        <img
        alt='img'
          src={laptop}
          style={{
            height:"200px",
            objectFit:"cover",
            marginBottom:"-50px"
          }}
        />
      }
      actions={[
        <>
         <DollarOutlined className='text-info'/><br/>
         Total: ${cartTotal}
        </>,
        <>
         <CheckOutlined className='text-info'/>
         <br/>
        Total Payable: $
         {(totalPayable/100).toFixed(2)} 
        </>,
      ]}
    >
      </Card>
    <form className='stripe-form' id='payment-form' onSubmit={handleSubmit}>
      <CardElement 
      id='card-element'
      options={cartStyle}
      onChange={handleChange}
      />
      <button className='stripe-button' disabled={processing || disabled  || cartTotal<=0||error}>
         <span id='button-text'>
            {processing ?<div className='spinner' id='spinner'></div>:"Pay"} 
         </span>
      </button>
      {error?<div className='card-error' role="alert">{error}</div>:""}
     </form>
    </>
  );
};

export default CheckoutForm;