import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Avatar, CssBaseline, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: 'white'
    }
  },
  paper: {
    padding:"10px 20px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Address = ({data,nextStep,handleChange, prevStep}) => {
  const dispatch=useDispatch();
  const { firstName, lastName, email, phone, address1, address2,information } = data;
  const classes = useStyles();

  const back = e => {
    e.preventDefault();
     prevStep();
  };

  const next = e => {
    e.preventDefault();
    nextStep();
  };

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
    <Container component="main" maxWidth="sm">
     <Grid sx={{minHeight:{xs:"auto", md:"70vh"}}}>
     <CssBaseline />
       <form className={classes.form} onSubmit={handleSaveAdress}>
         <div className={classes.paper}>  
          <Avatar className={classes.avatar}>
              <ContactMailIcon />
           </Avatar>
          <Typography component="h1" variant="h5">
            Enter Your Address
          </Typography>
          <Grid container spacing={2}>
           <Grid item xs={12} sm={6}>
             <TextField
               size="medium"
               autoComplete="fname"
               name="firstName"
               variant="outlined"
               required
               fullWidth
               id="firstName"
               label="first name"
               onChange={handleChange}
               autoFocus
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextField
               size="medium"
               variant="outlined"
               fullWidth
               id="lastName"
               label="last name"
               name="lastName"
               autoComplete="lname"
               onChange={handleChange}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               size="medium"
               variant="outlined"
               required
               fullWidth
               id="address1"
               label="Address1"
               name="address1"
               autoComplete="address1"
               onChange={handleChange}
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               size="medium"
               variant="outlined"
               fullWidth
               id="address2"
               label="Address2"
               name="address2"
               autoComplete="address2"
               onChange={handleChange}
             />
           </Grid>
           <Grid item xs={12}>
           <TextField
             variant="outlined"
             required
             size="medium"
             fullWidth
             id="number"
             type="number"
             label="phone number"
             name="phone"
             autoComplete="phone"
             onChange={handleChange}
           />
         </Grid>
           <Grid item xs={12}>
             <TextField
               size="medium"
               variant="outlined"
               required
               fullWidth
               type='email'
               id="email"
               label="email"
               name="email"
               autoComplete="email"
               onChange={handleChange}
             />
           </Grid>
           <Grid item xs={12}>
           <TextareaAutosize
               variant="outlined"
               minRows={3}
               name="information"
               style={{ width: "100%" }}
               onChange={handleChange}
               placeholder="Additional information"
             />
           </Grid>
         </Grid>
         </div> 
         <div className='row mt-5' style={{
          display:"flex",
          justifyContent:"space-evenly"
         }}>
          <div className='col-xs-4'>
             <button disabled  onClick={back}   class="btn btn-outline-success">Prev</button>
          </div>
          <div className='col-xs-4'>
             <button  disabled  onClick={next} class="btn btn-outline-info">Skip</button>
          </div>
          <div className='col-xs-4'>
             <button  type='submit' class="btn btn-outline-warning">next</button>
          </div>
         </div>
       </form>
     </Grid>
   </Container>
  )
}

export default Address;


