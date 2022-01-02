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
   const [subOption,setSubOption]=useState("");
   const [categories,setCategories]=useState([]);
   const[showSub,setShowSub]=useState(false);
   const[arrayOfSubIds,setArrayOfSubIds]=useState([]);
   const[selectedCategory,setSelectedCategory]=useState("");

   const {user}=useSelector((state)=>({...state}));
   useEffect(()=>{
       loadProduct(); 
       loadCategories();     
   },[])
   
   const loadProduct=()=>{
      getProduct(slug)
      .then((res)=>{
         console.log(res.data);
          // first load single product
           setValues({...values, ...res.data});
          //load single products sub category
          getCategorieSubs(res.data.category._id)
          .then((r)=>{
               setSubOption(r.data);   
          })
          const arr=[];
          res.data.subs.map((s)=>{
            arr.push(s._id);
          })
          setArrayOfSubIds((prev)=>arr);
       })
      .catch((error)=>{
          console.log(error);
        })
     }
     //--------------
    console.log(arrayOfSubIds);
    //----------------
   const loadCategories=()=>{
      getCategories()
     .then((res)=>{
       setCategories(res.data);
     })
     .catch(error =>console.log(error.message));
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
    const hadleCategoryChange=(e)=>{
        e.preventDefault();
        setValues({...values,subs:[]});
        setSelectedCategory(e.target.value);

        getCategorieSubs(e.target.value)
        .then((res)=>{
          setSubOption(res.data)
        })
        .catch((err)=>console.log(err.message));
        setShowSub(true);
        ///--------------------
        if(values.category._id===e.target.value){
          loadProduct();
        }
        setArrayOfSubIds([]);
     }      
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                  <AdminNav/>
               </div>
                   <div className="col-md-10"> 
                   <p>{JSON.stringify(values)}</p>
                     <ProductUpdateForm
                       handleSubmit={handleSubmit}
                       handleChange={handleChange}
                       values={values}
                       setValues={setValues} 
                       hadleCategoryChange={hadleCategoryChange}
                       categories={categories}
                       subOption={subOption}
                       arrayOfSubIds={arrayOfSubIds}
                       setArrayOfSubIds={setArrayOfSubIds}
                       selectedCategory={selectedCategory}
                     /> 
                 </div>
            </div>
        </div>
    );
};
export default ProductUpdate;