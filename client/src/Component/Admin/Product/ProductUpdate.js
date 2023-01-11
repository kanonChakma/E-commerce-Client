import { LoadingOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories, getCategorieSubs } from '../../../common/category';
import { getProduct, updateProduct } from '../../../common/product';
import FileUpload from '../../Form/FileUpload';
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
 //------------- --------------------
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
        <Container maxWidth="lg">
          <Grid  sx={{marginTop:"50px", minHeight: {sx:"auto", md:"100vh"}}}
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
            <Grid 
             style={{
              boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding:"10px 45px",
             }} item xs={12} sm={8} md={8}
           >
             {/* <p>{JSON.stringify(values)}</p> */}
             <h3>Product Update</h3>
             <hr/>
             <div className="mb-4 mt-4">
               <FileUpload 
                 values={values} 
                 setValues={setValues}
                 setLoading={setLoading}
               />
               <div>
                 {loading?<LoadingOutlined className="text-danger h1"/> :<h4></h4>}
               </div>
             </div>

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
           </Grid>
          </Grid> 
        </Container>
    );
};

export default ProductUpdate;