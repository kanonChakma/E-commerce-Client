import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const Register = () => {
    const [email,setEmail] =useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config ={
            url:"http://localhost:3000/register/complete",
            handleCodeInApp:true,
        }
        await auth.sendSignInLinkToEmail(email, config)
        .then(() => {
            toast.success(`Email is sent to ${email}. Click the link complete your registration`);
            window.localStorage.setItem('emailForRegistration', email);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage, errorCode);
          toast.error(error.message);
        });
    }
    const registerForm = () =>
        <form onSubmit={handleSubmit}>
            <input 
             type="email" 
             className="form-control" 
             onChange={e=>setEmail(e.target.value)}
             placeholder="Enter Your Email"
             autoFocus
            />
            <button type="submit" className="btn btn-raised">Register</button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};
export default Register;