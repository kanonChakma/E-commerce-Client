import React, { useState } from 'react';
import AdminNav from '../../nav/AdminNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { createCoupon } from '../../../common/coupon';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreateCoupon = () => {
    const [name,setName]=useState('');
    const[expiry,setExpiry]=useState("");
    const[discount,setDiscount]=useState('');
    const[loading,setLoading]=useState(false);

    const{user}=useSelector((state)=>({...state}));
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
     createCoupon({name,expiry,discount},user.token)
     .then((res)=>{
          setDiscount("")
          setDiscount("")
          setName("")
          setLoading(false);
          toast.success("Coupon are created;")
        })
     .catch((err)=>{
         console.log(err);
         toast.error("error are exist")
       })
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
               </div>
            </div>
        </div>
    );
};

export default CreateCoupon;
