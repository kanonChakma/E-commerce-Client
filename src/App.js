import React, { useEffect } from 'react';
import {Switch,Router, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Component/nav/Header';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

import {useDispatch} from 'react-redux';
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './common/authData';
const App=()=> {
   const dispatch=useDispatch();

   //to checkfirebase auth state
   useEffect(()=>{
     const unsubscribe=auth.onAuthStateChanged( async (user)=>{
         if(user){
              const  idTokenResult=await user.getIdTokenResult();
              currentUser(idTokenResult.token)
              .then((res)=>{
                dispatch({
                  type:'USER_LOGGED_IN',
                  payload:{
                    name:res.data.name,
                    email:res.data.email,
                    role:res.data.role,
                    token:idTokenResult.token,
                    _id:res.data._id
                  }
                })
              })
              .catch((err)=>console.log(err));
           }
       });
   },[])
  return (
  <>
   <Header/>
   <ToastContainer/>
   <Switch>
     <Route exact path="/" component={Home}/>
     <Route exact path="/login" component={Login} />
     <Route exact path="/register" component={Register} />
     <Route exact path="/register/complete" component={CompleteRegistration}/>
     <Route exact path="/forgot/password" component={ForgotPassword}/>
   </Switch>
  </>
  );
}

export default App;
