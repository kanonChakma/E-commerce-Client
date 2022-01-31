import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CreatePaymentIntents} from "../../common/stripe";
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutForm = () => {
  
  const dispatch=useDispatch();
  const{user}=useSelector((state)=>({...state}));

  const[succeeded,setSucceeded]=useState(false);
  const[error,setError]=useState(null);
  const[processing,setProcessing]=useState(false)
  const[disabled,setDisabled]=useState(true);
  const[clientSecret,setClientSecret]=useState("");

  const stripe = useStripe();
  const elements = useElements();
 
  useEffect(()=>{
    CreatePaymentIntents(user.token)
    .then((res)=>{
        console.log(res.data.clientSecret);
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
   
    if(payload.error){
      setError(`payment failed ${payload.error}`)
      setProcessing(false);
    }else{
      console.log(payload)
      setProcessing(false);
      setSucceeded(true);
      setError(null);
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
  return (
    <>
    <p className={succeeded?"result-message":"result-message hidden"}>
       Payment Successful.{" "}
       <Link to="user/history">
         See it in your purchase
       </Link>
    </p>
    <form className='stripe-form' id='payment-form' onSubmit={handleSubmit}>
      <CardElement 
      id='card-element'
      options={cartStyle}
      onChange={handleChange}
      />
      <button className='stripe-button' disabled={processing || disabled || succeeded}>
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