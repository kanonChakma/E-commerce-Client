import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { currentAdmin } from '../../common/authData';
import CountDown from './CountDown';

const UserRoute = ({ children, ...rest }) => {
    const {user}=useSelector((state) =>({...state}));    
    const [ok,setOk]=useState(false);
    useEffect(() => {
      if(user && user.token) {
        currentAdmin(user.token)
        .then((result) => {
            console.log(result);
            setOk(true);
         })
        .catch((error) => {
            console.error(error.message);
            setOk(false);
         })
       }
    },[user])

    return ok?(
       <Route {...rest} render={()=>children}/>
      ):(
         <CountDown/>
      )
};

export default UserRoute;