import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories, getCategorieSubs } from '../../../common/category';
import { CreateProduct, getProduct } from '../../../common/product';
import FileUpload from '../../Form/FileUpload';
import ProductForm from '../../Form/ProductForm';
import AdminNav from '../../nav/AdminNav';
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from '../../Form/ProductUpdateForm';

const initialState={
   title:"",
   description:"",
   price:'',
   category:"",
   categories:[],
   subs:[],
   quantity:"",
   images:[],
   shipping:"",
   colors:["Black","Brown","Silver","White","Blue"],
   brands:["Apple","Samsung","Microsoft","Lenovo","Asus"],
   color:"",
   brand:"",
 }
const ProductUpdate = ({match}) => {
   const {slug}=match.params
   const [values,setValues]=useState(initialState);
   const {user}=useSelector((state)=>({...state}));
   useEffect(()=>{
       loadProduct(slug);      
   },[])
   const loadProduct=(slug)=>{
      getProduct(slug)
      .then((res)=>{
           setValues({...values, ...res.data});
      })
      .catch((error)=>{
         
        })
     }
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
                     <ProductUpdateForm
                       handleSubmit={handleSubmit}
                       handleChange={handleChange}
                       values={values}
                       setValues={setValues} 
                     /> 
                 </div>
            </div>
        </div>
    );
};
export default ProductUpdate;