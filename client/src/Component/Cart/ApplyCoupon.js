import { Box, Container } from '@mui/material';
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
      <Container maxWidth="sm">
      <Box 
         style={{
          minHeight:"65vh"
        }}>
      <div className='row'>
          <div className='col-md-12 offset-md-0 mt-5 pt-5'>
          <h4 className='text-center p-3 mb-5'>Apply Coupon</h4> 
        <input 
           onChange={(e) => {
               setCoupon(e.target.value)
               setError("")
             }} 
           placeholder="Enter Coupon Code"
           className="form-control mt-3"
           value={coupon}            
        />
         <div className='row mt-5' style={{
            display:"flex",
            justifyContent:"space-evenly"
         }}>
            <div className='col-xs-4'>
               <button   onClick={back}   class="btn btn-outline-success">Prev</button>
            </div>
            <div className='col-xs-4'>
               <button   onClick={next} class="btn btn-outline-info">Skip</button>
            </div>
            <div className='col-xs-4'>
               <button  onClick={handleApply} class="btn btn-outline-warning">Apply</button>
            </div>
         </div> 
          <div className='mt-3'>
             {error && <p className='bg-danger p-2 display-5'>{error}</p>}     
          </div>    
          </div>
      </div>
      </Box> 
    </Container>
    );
};

export default ApplyCoupon;