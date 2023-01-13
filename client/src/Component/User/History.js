import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Container, Grid, Typography } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../common/user';
import UserNav from '../Nav/UserNav';
import MyDocument from '../Order/MyDocument';


const History=() => {
  const[orders,setOrders]=useState([])
  const{user,cart}=useSelector((state)=>({...state}))

  useEffect(()=>{
    userOrderProduct()
  },[]) // eslint-disable-line no-use-before-define

  const userOrderProduct=()=>{
    getOrder(user.token)
    .then((res)=>{
      setOrders(res.data)
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const   showPaymentInfo=(order,status)=>(
    <Grid container>
      <Grid item xs={12} >
       <table className='table table-border table-dark'>
     <tbody>
        <tr>
            <th scope='col'>Order Id:</th>
            <th scope='col'>{order.paymentIntent.id}</th>
        </tr>
        <tr>
            <th scope='col'>Ordered On:</th>
            <th scope='col'>{new Date(order.paymentIntent.created*1000).toLocaleString()}</th>
        </tr>
        {status && <tr className='text-bold text-primary'>
            <th  scope='col'>Status:</th>
            <th scope='col'>{order.orderStatus}</th>
        </tr>}
      </tbody>
       </table>
      </Grid>
       <Grid item xs={12}>
        <table className='table table-border table-dark'>
        <tbody>
            <tr>
                <th scope='col'>Amount:</th>
                <th scope='col'>{(order.paymentIntent.amount /= 100).toLocaleString("en-US",{
          style:"currency",
          currency:"USD",
      })}</th>
            </tr>
            <tr>
                <th scope='col'>Currency::</th>
                <th scope='col'>{order.paymentIntent.currency.toUpperCase()}</th>
            </tr>
            <tr>
                <th scope='col'>Method:</th>
                <th scope='col'>{order.paymentIntent.payment_method[0]}</th>
            </tr>
        </tbody>
        </table>
      </Grid>
   </Grid>
  )

  const showOrderTable=(order)=>(
    <table className='table table-bordered'>
       <thead className='thead-dark'>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
            <th scope='col'>Shipping</th>
          </tr>
       </thead>
       <tbody>
         {
           order.products.map((p,i)=>(
            <tr key={i}>
            <th scope='col'>{p.product.title}</th>
            <th scope='col'>{p.product.price}</th>
            <th scope='col'>{p.product.brand}</th>
            <th scope='col'>{p.color}</th>
            <th scope='col'>{p.count}</th>
            <th scope='col'>{p.product.shipping ==="Yes"? <CheckCircleOutlined className='text-success Pointer'/>:
                         <CloseCircleOutlined className='text-danger Pointer'/>}</th>
               </tr>
           ))
         }
       </tbody>
    </table>
  )
  const showOrderTableOne=(order)=>(
    <table className='table table-bordered'>
       <thead className='thead-dark'>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Shipping</th>
          </tr>
       </thead>
       <tbody>
         {
           order.products.map((p,i)=>(
            <tr key={i}>
            <th scope='col'>{p.product.title}</th>
            <th scope='col'>{p.product.price}</th>
            <th scope='col'>{p.product.shipping ==="Yes"? <CheckCircleOutlined className='text-success Pointer'/>:
                         <CloseCircleOutlined className='text-danger Pointer'/>}</th>
               </tr>
           ))
         }
       </tbody>
    </table>
  )
 const showOrders=()=>(
   orders.reverse().map((order,i)=>(
     <Grid py={3} key={i}>
      {  showPaymentInfo (order,true)}

       <Grid sx={{
        display:{xs:"none",md:"block"}
       }} item xs={12}>
         {showOrderTable(order)} 
      </Grid>
      <Grid sx={{
        display:{md:"none"}
      }}item xs={12}>
        {showOrderTableOne(order)} 
     </Grid>
      <div className='row mb-3'>
          <div className='col text-center'>
          <PDFDownloadLink
            document={
              <MyDocument order={order}/>
              }
            fileName='invoice.pdf'
            className='btn btn-sm btn-outline-primary text-center'
          >
            Download Pdf
          </PDFDownloadLink>
        </div>
      </div>
     </Grid>
   ))
 )
  return(
    <Container maxWidth="lg">
      <Grid
      sx={{marginTop:"50px", minHeight: {sx:"auto", md:"70vh"}}}
      container
      >
          <Grid
          sx={{
            padding:"10px 20px",
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            height:{sx:"auto", sm:"350px"}
            }}
           item xs={12} sm={3}  md={3}>
            <UserNav/>
          </Grid>
          <Grid  item xs={12} sm={1}  md={1}>
          </Grid>
          <Grid  item xs={12} sm={8}  md={8}>
             <Grid
             style={{
              padding:"10px 20px",
          }}
          container
             >
                 <Grid item xs={12}  mb={1}>
                    <Typography variant="h5"  style={{ justifyContent:"center",marginBottom:"10px", textAlign:"center"}}>
                        {orders.length>0?"User purchase orders":"No purchase Orders"}
                      </Typography>
                 </Grid>
                <Grid item xs={12} mb={3}>
                  {showOrders()}
                </Grid>
             </Grid>
          </Grid>
      </Grid>
  </Container> 
  )
}
export default History;