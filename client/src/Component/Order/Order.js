import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Box, Grid } from '@mui/material';
import moment from 'moment';
import React from 'react';

const Order = ({orders,handleStatus}) => {

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
            <td scope='col'>{moment(order.paymentIntent.created).format("DD-MM-YYYY h:mm:ss")}</td>
        </tr>
        <tr>
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
    return (
        <div className='row'>
          <div className='col'>
                 {
                   orders.map((order,i)=>(
                            <div key={i} className='ml-4 mb-5 p-3 card'>
                                {showPaymentInfo (order,false)}
                                 <div className='row text-primary'>
                                    <div className='col-md-4 mt-2 mb-2'>
                                        <p className='fw-bold fs-1'>Update Delivery Status:</p>
                                    </div>

                                    <div className='col-md-8 mt-2 mb-3'>
                                       <select
                                        onChange={(e)=>handleStatus(order._id,e.target.value)}
                                       defaultValue={order.orderStatus}
                                       className='form-control text-primary'
                                       >
                                          <option value="Not Processing">Not Processing</option>
                                          <option value="Cash On Delivery"> Cash On Delivery</option>
                                          <option value="Processing">Processing</option>
                                          <option value="Dispatch">Dispatch</option>
                                          <option value="Cancelled">Cancelled</option>
                                          <option value="Completed">Completed</option>
                                        </select>   
                                    </div>    
                                 </div>
                              <Box>
                              <Grid item 
                              sx={{
                                display:{xs:"none",md:"block"}
                              }}
                              >
                                {showOrderTable(order)}
                              </Grid>
                             <Grid
                             sx={{
                               display:{md:"none"}
                             }}
                             >
                               {showOrderTableOne(order)}
                              </Grid>
                              </Box>
                            </div>
                        ))
                     } 
          </div>
        </div>
    );
};

export default Order;