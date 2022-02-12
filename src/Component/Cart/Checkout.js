import React, { useEffect, useState } from 'react';
import Address from './Address';
import ApplyCoupon from './ApplyCoupon';
import OrderSummary from './OrderSummary';

const Checkout = () => {
    const [step,setStep]=useState(1);
    const[totalPrice,setTotalPrice]=useState(0);

    const[data,setData]=useState({
        firstName: '',
        lastName: '',
        email: '',
        phone:'',
        address1:'',
        address2:'',
        information:'',
      });
      const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
     }

      //----Proceed to next step
      const nextStep = () => {
        setStep(step+1)
      };
    
      //----Go back to prev step
     const prevStep = () => {
        setStep(step-1)
      };

      switch (step) {
        case 1:
          return (
            <Address
              nextStep={nextStep}
              data={data}
              handleChange={handleChange}
            />
          );
        case 2:
          return (
            <ApplyCoupon
              nextStep={nextStep}
              prevStep={prevStep}
              setTotalPrice={setTotalPrice}
            />
          );
        case 3:
          return (
            <OrderSummary
              totalPrice={totalPrice}
              nextStep={nextStep}
              prevStep={prevStep}
              setTotalPrice={setTotalPrice}
            />
          );
        default:
          (console.log('This is a multi-step form built with React.'))
        }
};

export default Checkout;