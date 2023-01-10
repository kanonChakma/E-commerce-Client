import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import "../../css/Stripe.css";
import CheckoutForm from './CheckoutForm';
const promise=loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <div 
        style={{
          minHeight: "80vh"
        }}
        className='container p-5 text-center'>
           <h4>Complete Your Purchase</h4>
           <Elements stripe={promise}>
             <div className='col-md-8 offset-md-2'>
                <CheckoutForm/>
             </div>
           </Elements>
        </div>
    );
};

export default Payment;