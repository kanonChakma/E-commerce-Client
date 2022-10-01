import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const ForgotPassword = () => {
     const [email,setEmail]=useState('');
     const [loading,setLoading]=useState(false)
    const {user}=useSelector((state)=>({...state}))
     useEffect(()=>{
       
     },[user])
     const handleSubmit=async (e)=>{
     e.preventDefault();
     setLoading(true);
     const config ={
        url:"http://localhost:3000/login",
        handleCodeInApp:true,
      }
     await auth.sendPasswordResetEmail(email,config)
     .then(()=>{
         setEmail('');
         setLoading(false)
     })
     .catch((err)=>{
         setLoading(false);
         toast.error(err.message);
      });
    };

    return (
        <div className="container col-md-6 col-offset-5 p-5">
         <div className="mb-5">
             {loading?<h4>Loading...</h4>:<h4>Forgot Password</h4>}
         </div>
          <form onSubmit={handleSubmit}>
            <input 
             type="email" 
             value={email}
             className="form-control" 
             onChange={e=>setEmail(e.target.value)}
             autoFocus
             placeholder="Enter Your Email"
            />
            <button type="submit" className="btn btn-raised my-3">SUBMIT</button>
        </form>
        </div>
    );
};
export default ForgotPassword;