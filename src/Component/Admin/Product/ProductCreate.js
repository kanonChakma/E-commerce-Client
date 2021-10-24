import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateProduct } from '../../../common/product';
import AdminNav from '../../nav/AdminNav';

const initialState={
  title:"",
  description:"",
  price:'',
  category:"",
  subs:[],
  quantity:"",
  images:[],
  shipping:"",
  colors:["Black","Brown","Silver","White","Blue"],
  brands:["Apple","Samsung","Microsoft","Lenovo","Asus"],
  color:"",
  brand:"",
}
const ProductCreate = () => {
    const[values,setValues]=useState(initialState);
    const {title,description,price,category,subs,quantity,images,shipping,colors,brands,color,brand}=values;
    
    //Redux
    const {user}=useSelector((state)=>({...state}));
    //submit form
    const handleSubmit=(e)=>{
      e.preventDefault();
      CreateProduct(values,user.token)
      .then((res)=>{
          console.log(res);
          toast.success(`${res.data.title} are created`);
           //window.alert("product is created");
          // window.location.reload();
        })
      .catch((err)=>{
          console.log(err);
          toast.error(`${err.response.data.err}`)
       // if(err.status===400) toast.error(`${err.message}`)
        })
     }
    const handleChange=(e)=>{
         setValues({...values,[e.target.name]:e.target.value})
      }
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                 <AdminNav/>
               </div>
               <div className="col-md-10">
                    <h4 className="text-center">Product create</h4>
                   <form onSubmit={handleSubmit}>
                       <div className="form-group">
                            <label>Title</label>   
                            <input 
                            name="title" 
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={handleChange}
                            />
                       </div>
                       <div className="form-group">
                            <label>Description</label>   
                            <input 
                            name="description" 
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={handleChange}
                            />
                       </div>
                       <div className="form-group">
                            <label>Price</label>   
                            <input 
                            type="number"
                            name="price" 
                            className="form-control"
                            value={price}
                            onChange={handleChange}
                            />
                       </div>
                       <div className="form-group">
                            <label>Shipping</label>   
                            <select 
                            name="shipping" 
                            className="form-control"
                            onChange={handleChange}
                            >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                         </select>   
                       </div>
                       <div className="form-group">
                            <label>Quantity</label>   
                            <input 
                            type="number"
                            name="quantity" 
                            className="form-control"
                            value={quantity}
                            onChange={handleChange}
                            />
                       </div>
                       <div className="form-group">
                            <label>Colors</label>   
                            <select 
                            name="color" 
                            className="form-control"
                            onChange={handleChange}
                            >
                            <option>Please Select</option>
                            {colors.map((c)=><option key={c} value={c}>{c}</option>)}
                         </select>   
                       </div>
                       <div className="form-group">
                            <label>Brands</label>   
                            <select 
                            name="brand" 
                            className="form-control"
                            onChange={handleChange}
                            >
                            <option>Please Select</option>
                            {brands.map((c)=><option key={c} value={c}>{c}</option>)}
                         </select>   
                       </div>
                       <button className="btn btn-outline-info">Save</button>
                   </form>
               </div>
            </div>
        </div>
    );
};

export default ProductCreate;