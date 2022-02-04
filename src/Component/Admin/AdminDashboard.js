import React, { useEffect, useState } from 'react'
import { getOrders,updateOderStatus} from '../../common/admin';
import AdminNav from '../nav/AdminNav';
import { useSelector } from 'react-redux';
import Order from '../Order/Order';
import { toast } from 'react-toastify';

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
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                  <AdminNav/>
               </div>
                  <div className="col-md-8">
                     <h4>Admin Dashboard</h4>
                     <Order orders={orders} handleStatus={handleStatus}/>
                 </div>
            </div>
        </div>
    )
}

export default AdminDashboard;