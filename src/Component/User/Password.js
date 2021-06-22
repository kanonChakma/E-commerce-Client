import React from 'react';
import { useState } from 'react';
import { auth } from '../../firebase';
import UserNav from '../Nav/UserNav';
import { toast } from 'react-toastify';

const Password=() => {
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       await auth.currentUser.updatePassword(password)
       .then(() => {
           setLoading(false);
           setPassword("")
           toast.success('Password updated');
        })
       .catch((err) => {
           setLoading(false);
           toast.error(err.message);
       })
    }

    const updatePassword=() =>(
        <form onSubmit={handleSubmit}>
           <div className="form-group">
               <label className="my-3">Enter Your Password</label>
               <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                placeholder="password"
               />
               <button  
               className="btn btn-dark"
               disabled={loading || password.length<6 || !password}
               >Submit</button>
           </div> 
        </form>
    )
  return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
              <UserNav/>
        </div>
        <div className="col">
           <div className="w-50">
                {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary text-center">Update Password</h4>}
                {updatePassword()}
           </div>
        </div>
    </div>
  </div> 
  )
}
export default Password;