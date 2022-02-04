import React from 'react';
import ShowPaymentInfo from '../Cards/ShowPaymentInfo';
import { CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';

const Order = ({orders,handleStatus}) => {
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
    return (
        <div className='row'>
          <div className='col'>
                 {
                   orders.map((order,i)=>(
                            <div key={i} className='m-5 p-3 card'>
                                <ShowPaymentInfo order={order} status={false}/>
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
                                          <option value="Processing">Processing</option>
                                          <option value="Dispatch">Dispatch</option>
                                          <option value="Cancelled">Cancelled</option>
                                          <option value="Completed">Completed</option>
                                        </select>   
                                     </div>    
                                 </div>
                                {showOrderTable(order)}
                            </div>
                        ))
                     } 
          </div>
        </div>
    );
};

export default Order;