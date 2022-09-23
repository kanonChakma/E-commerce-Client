import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories, getCategorieSubs } from '../../../common/category';
import { CreateProduct, getProduct, updateProduct } from '../../../common/product';
import FileUpload from '../../Form/FileUpload';
import ProductForm from '../../Form/ProductForm';
import {LoadingOutlined} from '@ant-design/icons';
import ProductUpdateForm from '../../Form/ProductUpdateForm';
import AdminNav from '../../Nav/AdminNav';


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
   brands:["Google","Apple","Samsung","Microsoft","Lenovo","Asus"],
   color:"",
   brand:"",
 }
const ProductUpdate = ({match,history}) => {
   const {slug}=match.params
   const [values,setValues]=useState(initialState);
   const [subOption,setSubOption]=useState("");
   const [categories,setCategories]=useState([]);
   const[showSub,setShowSub]=useState(false);
   const[arrayOfSubIds,setArrayOfSubIds]=useState([]);
   const[selectedCategory,setSelectedCategory]=useState("");
   const[loading,setLoading]=useState(false);

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
   const loadCategories=()=>{
      getCategories()
     .then((res)=>{
       setCategories(res.data);
     })
     .catch(error =>console.log(error.message));
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
     // For checking that change category match with existing category or not
     if(values.category._id ===e.target.value){
       loadProduct();
     }
     setArrayOfSubIds([]);
  } 
 //------------- 
  const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true);
      
      values.subs=arrayOfSubIds;
      values.category=selectedCategory?selectedCategory:values.category;
      
      updateProduct(slug,values,user.token)
      .then((res)=>{
        setLoading(false);
          toast.success(`${res.data.title} are updated`);
          history.push("/admin/products");
        })
      .catch((err)=>{
         toast.error(err.response.data.err);
        })
     }     
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                  <AdminNav/>
               </div>
                   <div className="col-md-10"> 
                   {/* <p>{JSON.stringify(values)}</p> */}
                    <h3>Product Update</h3>
                    <hr/>
                   <div className="p-3 flex-row">
                      <FileUpload 
                      values={values} 
                      setValues={setValues}
                      setLoading={setLoading}
                      />
                      <div>
                        <h2>Hello this need to be fixed</h2>
                           {loading?<LoadingOutlined className="text-danger h1"/> :<h4></h4>}
                      </div>
                    </div>
                    <hr/>
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