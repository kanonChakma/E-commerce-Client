import { Box, Container, Step, StepButton, Stepper } from '@mui/material';
import React, { useState } from 'react';
import Address from './Address';
import ApplyCoupon from './ApplyCoupon';
import OrderSummary from './OrderSummary';

const steps = ['Address', 'Coupon', 'Create an ad'];

const Checkout = () => {
    const [step,setStep]=useState(0);
    const[totalPrice,setTotalPrice]=useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
  
    console.log(activeStep)
    const[data,setData]=useState({
        firstName: '',
        lastName: '',
        email: '',
        phone:'',
        address1:'',
        address2:'',
        information:'',
      });

      const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
     }
       console.log(data);
      //----Proceed to next step
      const nextStep = () => {
        setActiveStep(step+1);
        setStep(step+1)
      };
    
      //----Go back to prev step
     const prevStep = () => {
        setActiveStep(step-1);
        setStep(step-1)
      };

     let selectState = () => {
      switch (step) {
        case 0:
          return (
            <Address
              nextStep={nextStep}
              data={data}
              handleChange={handleChange}
              prevStep={prevStep}
            />
          );
        case 1:
          return (
            <ApplyCoupon
              nextStep={nextStep}
              prevStep={prevStep}
              setTotalPrice={setTotalPrice}
            />
          );
        case 2:
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
     }

    return (
      <Container maxWidth="sm">
        <Box
        style={{
          marginTop: "30px"
        }}
        >
          <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit">
                {label}
              </StepButton>
            </Step>
          ))}
          </Stepper>
          {selectState()}
        </Box>
      </Container>
    )
};

export default Checkout;


