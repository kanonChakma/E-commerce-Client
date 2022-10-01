import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import CountDown from './CountDown';
 
const UserRoute = ({ children, ...rest }) => {
    const {user}=useSelector((state) =>({...state}));    
   
    return user && user.token?(
       <Route {...rest} render={()=>children} />
      ):(
         <CountDown/>
      )
};

export default UserRoute;