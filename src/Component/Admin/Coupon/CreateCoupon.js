import React, { useEffect, useState } from 'react';
import AdminNav from '../../nav/AdminNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { createCoupon, getCoupons,deleteCoupon } from '../../../common/coupon';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';

const CreateCoupon = () => {
    const [name,setName]=useState('');
    const[expiry,setExpiry]=useState("");
    const[discount,setDiscount]=useState('');
    const[loading,setLoading]=useState(false);
    const[coupons,setCoupons]=useState([])
    const[couponLoad,setCouponLoad]=useState(false);

    const{user}=useSelector((state)=>({...state}));
    
     useEffect(()=>{
         getCoupons()
         .then((res)=>setCoupons(res.data))
         .catch((err)=>console.log(err))
     },[couponLoad])

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        createCoupon({name,expiry,discount},user.token)
     .then((res)=>{
          setDiscount("")
          setDiscount("")
          setName("")
          setLoading(false);
          setCouponLoad(!couponLoad);
          toast.success("Coupon are created;")
        })
     .catch((err)=>{
         console.log(err);
         toast.error("error are exist")
       })
    }

    const handleDelete=(couponId)=>{
     if(window.confirm("Delete?")){
        setLoading(true);
        deleteCoupon(couponId,user.token)
        .then((res)=>{
          setLoading(false);
          setCouponLoad(!couponLoad)
          toast.success("Deleted This coupon")
        })
      }
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
               <div className='col-md-2'>
                   <AdminNav/>
               </div>
               <div className='col-md-8'>
                 <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='text-muted'>Name</label>
                        <input 
                        type="text"
                        onChange={(e) => setName(e.target.value)} 
                        className="form-control"
                        value={name}
                        autoFocus
                        required             
                        />
                    </div>
                    <div className="form-group">
                     <label className='text-muted'>Discount</label>
                        <input 
                        onChange={(e) => setDiscount(e.target.value)} 
                        className="form-control"
                        value={discount}
                        required             
                        />
                    </div>
                    <div className="form-group">
                        <label className='text-muted'>Select Date</label>
                      <DatePicker 
                         className="form-control"
                         autoFocus
                         required      
                         selected={new Date()}
                         value={expiry}
                         onChange={(date) => setExpiry(date)} />
                      </div>
                      <button className="btn btn-outline-secondary">Submit</button>  
                 </form>
                 <div className='text-center'>
                     {loading?<h4>loading...</h4>:<h4>All Coupons</h4>}
                 </div>
                 
                   <table className="table table-bordered">
                        <thead className='thead-light'>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            coupons.map((c)=>(
                                <tr key={c._id}>
                                    <th>{c.name}</th>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}%</td>
                                    <td>
                                    <DeleteOutlined onClick={()=>handleDelete(c._id)} className='text-danger Pointer'/>
                                    </td>
                                 </tr>
                             ))  
                           }  
                         </tbody>
                     </table>    
                </div>
            </div>
        </div>
    );
};

export default CreateCoupon;
