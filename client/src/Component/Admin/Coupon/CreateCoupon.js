import { DeleteOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCoupon, deleteCoupon, getCoupons } from '../../../common/coupon';
import AdminNav from '../../Nav/AdminNav';

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
        <Container maxWidth="lg">
            <Grid  sx={{marginTop:"50px", minHeight: {sx:"auto", md:"70vh"}}}
            container>
                <Grid sx={{
                    padding:"10px 20px",
                    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    height:{sx:"auto", sm:"450px"}
                    }}
                        item xs={12} sm={3}  md={3} mb={2}>
                    <AdminNav/>
                </Grid>
                <Grid item xs={12} sm={1} md={1}></Grid>
                <Grid  style={{
                    boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    padding:"10px 45px",
                   }} item xs={12} sm={8} md={8}>  
                   <h2 className='text-center mt-3 mb-4'>Aply Coupon</h2>
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateCoupon;
