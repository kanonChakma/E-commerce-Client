import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Alert, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrUpdate } from '../../common/authData';
import { auth } from '../../firebase';

const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: 'white'
      }
    },
    paper: {
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      padding:"10px 20px",
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
      margin: theme.spacing(5, 0, 2),
      padding: "15px 5px"
    },
    button: {

    }
  }));

const CompleteRegistration = ({history}) => {
    const classes = useStyles();
    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)

    const dispatch=useDispatch();
    
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    },[])
    const passwordMacth = password === confirmpassword;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!passwordMacth) {
          setError(true)
          return;
        }

       try{
           const result = await auth.signInWithEmailLink(email,window.location.href);
          if(result.user.emailVerified)
            {
                //Remove user email from local Storage
                window.localStorage.removeItem('emailForRegistration');
                let user =auth.currentUser;
                console.log(user);
                await user.updatePassword(password);
                const idTokenResult=await user.getIdTokenResult();
                createOrUpdate(idTokenResult.token)
                .then((res)=>{
                    dispatch({
                        type: 'USER_LOGGED_IN',
                        payload: {
                            name:res.data.name,
                            email:res.data.email,
                            role:res.data.role,
                            token: idTokenResult.token,
                            _id:res.data._id
                        }
                    })
                })
                .catch((err)=>console.log(err))  
                history.push("/login");
            }   
         }catch(error){
            toast.error(error.message);
        }
    }


    const CompleteregisterForm = () =>
        <form onSubmit={handleSubmit}>
            <input 
             type="email" 
             className="form-control" 
              value={email}
             disabled
            />
           <br/>
             <input 
             type="password"
             placeholder='enter password' 
             className="form-control" 
             onChange={e=>setPassword(e.target.value)}
             autoFocus
            />
              <br/>
              <br/>
            <button type="submit" className="btn btn-raised">Complete Register</button>
        </form>

    return (
        <Container component="main" maxWidth="sm">
        <Grid 
        sx={{marginTop:"50px", minHeight: {sx:"auto", md:"60vh"}}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
             Register
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type='email'
                  disabled
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
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
                  onChange={e=>setPassword(e.target.value)}
                  autoComplete="current-password"
                  onMouseDown ={() => setError(false)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm password"
                  label="confirm password"
                  type="password"
                  id="confirm password"
                  onChange={e=>setConfirmPassword(e.target.value)}
                  onBlur={() => setError(false)}
                  onMouseDown ={() => setError(false)}
                  autoComplete="current-password"
                />
              </Grid>
               <Grid item xs={12}>
                {error?<Alert size="small" b severity="error">Password Does not match</Alert>: ""}
               </Grid>
              
            </Grid>
               <Button
               startIcon={<HowToRegIcon />}
               type="submit"
               fullWidth
               size='small'
               disabled={!email || password.length<6}
               variant="contained"
               color="primary"
               className={classes.submit}
             >
                Register
               </Button> 
            <Grid container>
              <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account?"}
              </Link>
              </Grid>
           </Grid>
          </form>
        </div>
        </Grid>
     </Container>
    );
};

export default CompleteRegistration;