import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../common/user';
import UserNav from '../nav/UserNav';
import { CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import ShowPaymentInfo from '../Cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../Order/MyDocument';


const History=() => {
  const[orders,setOrders]=useState([])
  const{user,cart}=useSelector((state)=>({...state}))
  useEffect(()=>{
    userOrderProduct()
  },[])
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
    <div className='row mb-3'>
    <div className='col-md-6 col-sm-6 col-sm-5 d-flex flex-column flex-start'>
    <table className='table table-border table-dark'>
     <tbody>
        <tr>
            <td scope='col'>Order Id:</td>
            <td scope='col'>{order.paymentIntent.id}</td>
        </tr>
        <tr>
            <td scope='col'>Ordered On:</td>
            <td scope='col'>{new Date(order.paymentIntent.created*1000).toLocaleString()}</td>
        </tr>
        {status && <tr className='text-bold text-primary'>
            <td  scope='col'>Status:</td>
            <td scope='col'>{order.orderStatus}</td>
        </tr>}
      </tbody>
    </table>
    </div>
    <div className='col-md-6 col-sm-6 d-flex flex-column'>
        <table className='table table-border table-dark'>
        <tbody>
            <tr>
                <td scope='col'>Amount:</td>
                <td scope='col'>{(order.paymentIntent.amount /= 100).toLocaleString("en-US",{
          style:"currency",
          currency:"USD",
      })}</td>
            </tr>
            <tr>
                <td scope='col'>Currency::</td>
                <td scope='col'>{order.paymentIntent.currency.toUpperCase()}</td>
            </tr>
            <tr>
                <td scope='col'>Method:</td>
                <td scope='col'>{order.paymentIntent.payment_method[0]}</td>
            </tr>
        </tbody>
        </table>
      </div>
   </div>
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

 const showOrders=()=>(
   orders.reverse().map((order,i)=>(
     <div key={i} className='m-5 p-3 card'>
      {  showPaymentInfo (order,true)}
        {showOrderTable(order)}
        <div className='row'>
            <div className='col'>
            <PDFDownloadLink
              document={
                <MyDocument order={order}/>
                }
              fileName='invoice.pdf'
              className='btn btn-sm btn-outline-primary'
            >
              Download Pdf
            </PDFDownloadLink>
          </div>
        </div>
     </div>
   ))
 )
  return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-3">
            <UserNav/>
        </div>
        <div className="col-md-8 text-center">
            <h4>{orders.length>0?"User purchase orders":"No purchase Orders"}</h4>
            {showOrders()}
        </div>
    </div>
  </div> 
  )
}
export default History;