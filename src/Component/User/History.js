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
   orders.map((order,i)=>(
     <div key={i} className='m-5 p-3 card'>
        <ShowPaymentInfo order={order} status={true}/>
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