import React, { useState } from 'react';
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
       console.log(data);
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

/*
import { Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { applyCoupon } from '../../common/coupon';

const ApplyCoupon = ({prevStep,nextStep,setTotalPrice}) => {
    const[coupon,setCoupon]=useState('');
    const{user}=useSelector((state)=>({...state}))
    const[error,setError]=useState("");

    const dispatch=useDispatch();

    const back = e => {
      e.preventDefault();
       prevStep();
    };
    const next = e => {
      e.preventDefault();
      nextStep();
    };
  
    const handleApply=()=>{
        applyCoupon(coupon,user.token)
        .then((res)=>{
           if(res.data.err){
               setError(res.data.err)
               dispatch({
                 type:"APPLY_COUPON",
                 payload:false
             })
           }else{
            console.log(res.data);
           setTotalPrice(res.data);
           setCoupon("")
           dispatch({
               type:"APPLY_COUPON",
               payload:true
           })
           toast.success("Coupon Apllied");
           nextStep()
           }
        })
     }
    return (
      <Container maxWidth="lg">
      <Grid 
         container
         alignItems="center"
         justifyContent="center"
         style={{ minHeight: '50vh' }}
         >
            <Grid>
            <h4 className='text-center p-3 mb-5'>Aplly Coupon</h4> 
            <input 
            onChange={(e) => {
               setCoupon(e.target.value)
               setError("")
               }} 
            placeholder="Enter Coupon Code"
            className="form-control mt-3"
            value={coupon}            
            />

     
         <Grid item xs={4}>
            <button   onClick={back}   class="btn btn-outline-success">Prev</button>
         </Grid>
         <Grid item xs={4}>
            <button   onClick={next} class="btn btn-outline-info">Skip</button>
         </Grid>
         <Grid item xs={4}>
            <button  onClick={handleApply} class="btn btn-outline-warning">Apply</button>
         </Grid>

         <Grid xs={12}>
           {error && <p className='bg-danger p-2 display-5'>{error}</p>}     
        </Grid>    
            </Grid>
           </Grid>
  </Container>
    );
};

export default ApplyCoupon;
*/