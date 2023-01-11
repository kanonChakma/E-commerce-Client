import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const Register = () => {
    const [email,setEmail] =useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email){
            toast.error("Email is Empty!!");
            return;
        }
       
        const config ={
            url:"http://localhost:3000/register/complete",
            handleCodeInApp:true,
        }
        await auth.sendSignInLinkToEmail(email, config)
        .then(() => {
            toast.success(`Email is sent to ${email}. Click the link complete your registration`);
            window.localStorage.setItem('emailForRegistration', email);
            setEmail("")
        })
        .catch((error) => {
          //var errorCode = error.code;
         // var errorMessage = error.message;
          toast.error(error.message);
        });
    }
    const registerForm = () =>
        <form onSubmit={handleSubmit}>
            <input 
             value={email}
             type="email" 
             className="form-control" 
             onChange={e=>setEmail(e.target.value)}
             placeholder="Enter Your Email"
             autoFocus
            />
            <button type="submit" className="btn btn-raised mt-3">send</button>
        </form>

    return (
        <div 
        style={{
            minHeight: "60vh",
            marginTop: "30px"
        }}
        className="container p-5 mb-3">
            <div className="row mb-3">
                <div className="col-md-6 offset-md-3">
                    <h4 className='text-center mb-3'>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;