import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Avatar, Button, CssBaseline, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: 'white'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Address = ({data,nextStep,handleChange}) => {
  const{address}=useSelector((state)=>({...state}))
  const dispatch=useDispatch();
  const { firstName, lastName, email, phone, address1, address2,information } = data;
  const classes = useStyles();


    const handleSaveAdress=(e)=>{
      e.preventDefault();
       dispatch({
        type:"ADD_ADDRESS",
        payload:data
      })
        toast.success("address saved")
        nextStep()
     }

  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ContactMailIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
         Enter Your Address
      </Typography>
      <form className={classes.form} onSubmit={handleSaveAdress}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address1"
              label="First Address"
              name="address1"
              autoComplete="address1"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="address2"
              label="Second Address"
              name="address2"
              autoComplete="address2"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="number"
            type="number"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            onChange={handleChange}
          />
        </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type='email'
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
           <TextareaAutosize
              variant="outlined"
              style={{ width: 350 }}
              minRows={3}
              name="information"
              onChange={handleChange}
              placeholder="Additional information"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  </Container>
  )
}
export default Address;




// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const Address = ({data,nextStep,handleChange}) => {
//     const{address}=useSelector((state)=>({...state}))
//     const dispatch=useDispatch();
//     const { firstName, lastName, email, phone, address1, address2,information } = data;


//     const handleSaveAdress=(e)=>{
//       e.preventDefault();
//        dispatch({
//         type:"ADD_ADDRESS",
//         payload:data
//       })
//         toast.success("address saved")
//         nextStep()
//       }
//       //   saveAddress(user.token,data)
//       //   .then((res)=>{
//       //       if(res.data.ok) 
//       //       setAdress('') 
//       //       setSaveAdd(true)
//       //      })
//       //   .catch((err)=>toast.error("error are exis"));
//       // 

//     return (
//       <div className='container'>
//             <div className='row'>
//                 <div className='col-md-6 offset-md-3  mt-5 pt-5'>
//                   <h4 className='text-center  p-3 mb-3'>Add Address</h4>
//                 <form onSubmit={handleSaveAdress} className='bg-secondary text-light p-3'>
//                   <div className="row mb-4">
//                     <div className="col">
//                       <div className="form-outline">
//                         <input reuired type="text" onChange={handleChange} name="firstName" value={firstName} className="form-control" />
//                         <label>First name</label>
//                       </div>
//                     </div>
//                     <div className="col">
//                       <div className="form-outline">
//                         <input type="text" onChange={handleChange} name="lastName" value={lastName}  className="form-control" />
//                         <label >Last name</label>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <input type="text" onChange={handleChange} required name="address1" value={address1}  className="form-control" />
//                     <label >Address 1</label>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <input type="text" onChange={handleChange} name="address2" value={address2 }  className="form-control" />
//                     <label >Address 2</label>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <input type="email" onChange={handleChange} required name="email" value={email} className="form-control" />
//                     <label  >Email</label>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <input type="number" onChange={handleChange}  required name="phone" value={phone}  className="form-control" />
//                     <label  >Phone</label>
//                   </div>

//                   <div className="form-outline mb-4">
//                     <textarea className="form-control" onChange={handleChange}  name="information" value={information}  rows="3"></textarea>
//                     <label >Additional information</label>
//                   </div>
//                   <button  className="bg-dark  text-dark btn btn-primary btn-block mb-4">Save Address</button>
//                 </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Address;