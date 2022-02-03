import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../common/cart';
import UserNav from '../nav/UserNav';

const History=() => {
  const[order,setOrder]=useState([])
  const{user,cart}=useSelector((state)=>({...state}))
  useEffect(()=>{
    userOrderProduct()
  },[])
  const userOrderProduct=()=>{
    getOrder(user.token)
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
              <UserNav/>
        </div>
        <div className="col">
            <h1>Hello This is user page!</h1>
        </div>
    </div>
  </div> 
  )
}
export default History;