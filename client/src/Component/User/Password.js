import { Container, Grid, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import UserNav from '../Nav/UserNav';


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
               <label className="my-3"></label>
               <Tooltip title={password.length<=5?"Password should be greater than five":""}>
                <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                placeholder="Enter Your Password"
                />
               </Tooltip>
               <button  
               className="btn btn-raised mt-3"
               disabled={loading || password.length<=5 || !password}
               >Submit</button>
           </div> 
        </form>
    )
  return(
    <Container maxWidth="lg">
       <Grid 
       sx={{marginTop:"50px", minHeight: {sx:"auto", md:"70vh"}}}
         container 
       >
        <Grid 
        sx={{
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            padding:"10px 20px",
            height:{sx:"auto", sm:"350px"}
        }}
        item xs={12} sm={3}>
              <UserNav/>
        </Grid>
        <Grid item xs={12} sm={2}>
        </Grid>
        
        <Grid
        style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            padding:"10px 30px"}}
            item  xs={12} sm={5}
         >
         {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary text-center">Update Password</h4>}
                {updatePassword()}
        </Grid>
    </Grid>
  </Container> 
  )
}
export default Password;