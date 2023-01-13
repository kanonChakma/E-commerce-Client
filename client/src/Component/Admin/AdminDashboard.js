import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getOrders, updateOderStatus } from '../../common/admin';
import AdminNav from '../Nav/AdminNav';
import Order from '../Order/Order';

const AdminDashboard= () =>{
    const[orders,setOrders]=useState([]);
    const {user}=useSelector((state) =>({...state}))

    useEffect(()=>{
       loadOrders()
    },[])
    const loadOrders=()=>{
        getOrders(user.token)
        .then((res)=>setOrders(res.data))
        .then((err)=>console.log(err));
     }
     const handleStatus=(orderId,orderStatus)=>{
        updateOderStatus(orderId,orderStatus,user.token)
        .then(res=>{
            toast.success("Delivery Status Updaet");
            loadOrders()
        })
     }
     console.log(orders)
    return (
        <Container maxWidth="lg">
          <Grid  sx={{marginTop:"50px", minHeight: {sx:"auto", md:"70vh"}}}
            container>
                <Grid sx={{
                    padding:"10px 20px",
                    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    height:{sx:"auto", sm:"450px"}
                    }}
                    item xs={12} sm={3}  md={3}>
                    <AdminNav/>
                </Grid>
                <Grid item xs={12} sm={1} md={1}></Grid>
                <Grid
                style={{
                    padding:{xs:"0px", md:"10px"}
                }}
                item xs={12} sm={8} md={8}>
                <h4 className='text-center'>All Orders List</h4>
                     <Order orders={orders} handleStatus={handleStatus}/>
                 </Grid>
          </Grid>
        </Container>
    )
}

export default AdminDashboard;