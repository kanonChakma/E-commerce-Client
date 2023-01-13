import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrUpdate } from '../../common/authData';
import { auth, googleAuthProvider } from '../../firebase';

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
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = ({history}) => {
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [loading,setLoading] = useState(false);
    const [check,setChecked] = useState(true)
    const dispatch=useDispatch();
    const classes = useStyles();


    const authorization= (res) => {
        let exist=history.location.state;
        //console.log(exist);
         if(exist){
              history.push(exist.from);
         }else{
            if(res.data.role === 'admin'){
                history.push("/");    
               }else{
                   history.push("/");
               }
         }
      }

    const googleLogIn=()=>{
           auth.signInWithPopup(googleAuthProvider)
           .then(async (result)=>{
             const {user} = result;
             const idTokenResult= await user.getIdTokenResult();
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
                authorization(res);
            })
            .catch((err)=>console.log(err))
           })
           .catch((error)=>{
               toast.error(error.message);
           })
    }

  const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       try{
        const result=await auth.signInWithEmailAndPassword(email, password);
        const {user} = result;
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
              authorization(res);
          })
        .catch((err)=>console.log(err))  
       }catch(e){
           setLoading(false);
           toast.error(e.message);
       }
    }

 const handleCheck =() => {
   setChecked(!check)
   if(check) {
    setEmail('trainyourmind12345@gmail.com')
    setPassword('1234567')
  }else{
    setEmail('')
    setPassword('')
  }
 }
  return(
    <Container component="main" maxWidth="xs">
     <Grid 
     sx={{marginTop:"50px",border:"5px", minHeight: {sx:"auto", md:"70vh"}}}>
     <CssBaseline />
     <div className={classes.paper}>
       <Avatar className={classes.avatar}>
         <LockOutlinedIcon />
       </Avatar>
       <Typography component="h1" variant="h5">
          Sign In
       </Typography>
       <form className={classes.form} onSubmit={handleSubmit}>
         <Grid container spacing={2}>
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
               value={email}
               onChange={e=>setEmail(e.target.value)}
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
               value={password}
               id="password"
               onChange={e=>setPassword(e.target.value)}
               autoComplete="current-password"
             />
           </Grid>
         </Grid>
           <FormControlLabel 
           control={<Checkbox
            onChange={(e) => console.log(e)}
            onClick={handleCheck}
            size='small' />
          } 
           label="sign in as admin" 
           />
            <Button
            startIcon={<MailOutlineIcon />}
            type="submit"
            fullWidth
            disabled={!email || password.length<6}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           continue
          </Button>

              <Button
              startIcon={<GoogleIcon/>}
              onClick={googleLogIn}
              fullWidth
              variant="contained"
              color="warning"
              className={classes.submit}
            >
              Login with Google
            </Button>
            
         <Grid container>
         <Grid item xs>
           <Link href="#" variant="body2">
             Forgot password?
           </Link>
         </Grid>
         <Grid item>
           <Link href="/register" variant="body2">
             {"Don't have an account?"}
           </Link>
         </Grid>
       </Grid>
       </form>
     </div>
     </Grid>
  </Container>
  )
}
export default Login;

// import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { createOrUpdate } from '../../common/authData';
// import { auth, googleAuthProvider } from '../../firebase';

// const Login = ({history}) => {
//     const dispatch=useDispatch();
//     const [email,setEmail] =useState('');
//     const [password,setPassword] =useState('');
//     const [loading,setLoading] = useState(false);
    
//     //will not working lession->25
//     const {user}=useSelector((state)=>({...state}))
//     useEffect(()=>{
//         let exist=history.location.state;
//         if(exist){
//             return;
//         }else{
//             if(user && user.token) history.push("/");  
//         }
//     },[user, history])

//     const authorization= (res) => {

//         let exist=history.location.state;
//         //console.log(exist);
//          if(exist){
//               history.push(exist.from);
//          }else{
//             if(res.data.role === 'admin'){
//                 history.push("/admin/dashboard");    
//                }else{
//                    history.push("/");
//                }
//          }
//       }
//     const googleLogIn=()=>{
//            auth.signInWithPopup(googleAuthProvider)
//            .then(async (result)=>{
//              const {user} = result;
//              const idTokenResult= await user.getIdTokenResult();
//              createOrUpdate(idTokenResult.token)
//             .then((res)=>{
//                 dispatch({
//                     type: 'USER_LOGGED_IN',
//                     payload: {
//                         name:res.data.name,
//                         email:res.data.email,
//                         role:res.data.role,
//                         token: idTokenResult.token,
//                         _id:res.data._id
//                     }
//                 })
//                 authorization(res);
//             })
//             .catch((err)=>console.log(err))
//            })
//            .catch((error)=>{
//                toast.error(error.message);
//            })
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//        try{
//         const result=await auth.signInWithEmailAndPassword(email, password);
//         const {user} = result;
//         const idTokenResult=await user.getIdTokenResult();
//         createOrUpdate(idTokenResult.token)
//         .then((res)=>{
//             dispatch({
//                 type: 'USER_LOGGED_IN',
//                 payload: {
//                     name:res.data.name,
//                     email:res.data.email,
//                     role:res.data.role,
//                     token: idTokenResult.token,
//                     _id:res.data._id
//                  }
//               })
//               authorization(res);
//           })
//         .catch((err)=>console.log(err))  
//        }catch(e){
//            setLoading(false);
//            toast.error(e.message);
//        }
//     }
//     const LoginForm = () =>
//         <form onSubmit={handleSubmit}>
//             <div className="form-group">
//                 <input 
//                 type="email" 
//                 placeholder="Enter Your Email"
//                 className="form-control" 
//                 onChange={e=>setEmail(e.target.value)}
//                 value={email}
//                 autoFocus
//                 />
//             </div>
//             <div className="form-group">
//                 <input 
//                 type="password" 
//                 placeholder="Enter Your Password"
//                 className="form-control" 
//                 onChange={e=>setPassword(e.target.value)}
//                 value={password}
//                 autoFocus
//                 />
//             </div>
//            <Button 
//            onClick={handleSubmit}
//             type="primary"
//             icon={<MailOutlined />} 
//             size="large"
//             block
//             className="mb-3"
//             shape="round"
//             disabled={!email || password.length<6}
//             >
//                Login with Email
//            </Button>
//         </form>

//     return (
//         <div className="container p-5">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                      {loading?<h4 className="text-danger">Loading...</h4>:<h4>Login</h4>}
//                      {LoginForm()}
//                      <Button 
//                       onClick={googleLogIn}
//                         type="danger"
//                         icon={<GoogleOutlined />} 
//                         size="large"
//                         block
//                         className="mb-3"
//                         shape="round"
//                         >
//                         Login with Google
//                     </Button>
//                     <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;