import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories, getCategorieSubs } from '../../../common/category';
import { CreateProduct } from '../../../common/product';
import FileUpload from '../../Form/FileUpload';
import ProductForm from '../../Form/ProductForm';
import AdminNav from '../../nav/AdminNav';
import {LoadingOutlined} from '@ant-design/icons';

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
const ProductCreate = () => {
    const[values,setValues]=useState(initialState);
    const[subOption,setSubOption]=useState("");
    const[showSub,setShowSub]=useState(false);
    const[loading,setLoading]=useState(false);
    useEffect(() => {
            loadCategories();
        },[])
   const loadCategories=()=>{
        getCategories()
       .then((res)=>setValues({...values,categories:res.data}))
       .catch(error =>console.log(error.message));
   }
   const {user}=useSelector((state)=>({...state}));

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
      const hadleCategoryChange=(e)=>{
         e.preventDefault();
         setValues({...values,subs:[],category:e.target.value});
         getCategorieSubs(e.target.value)
         .then((res)=>setSubOption(res.data))
         .catch((err)=>console.log(err.message));
         setShowSub(true);
      }
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                 <AdminNav/>
               </div>

                  <div className="col-md-10">   
                    {loading?<LoadingOutlined className="text-danger h1"/> :<h4>Product Create</h4>}
                    <hr/>
                    <div className="p-3">
                      <FileUpload 
                      values={values} 
                      setValues={setValues}
                      setLoading={setLoading}
                      />
                    </div>

                   <ProductForm
                     handleSubmit={handleSubmit}
                     handleChange={handleChange}
                     values={values}
                     hadleCategoryChange={hadleCategoryChange}
                     subOption={subOption}
                     showSub={showSub}
                     setValues={setValues}
                   />
               </div>
            </div>
        </div>
    );
};
export default ProductCreate;