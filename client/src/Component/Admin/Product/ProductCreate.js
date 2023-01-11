import { LoadingOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories, getCategorieSubs } from '../../../common/category';
import { CreateProduct } from '../../../common/product';
import FileUpload from '../../Form/FileUpload';
import ProductForm from '../../Form/ProductForm';
import AdminNav from '../../Nav/AdminNav';

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
  brands:["Google","Apple","Samsung","Microsoft","Lenovo","Asus"],
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
                  <Grid  style={{
                    boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    padding:"10px 45px",
                }} item xs={12} sm={8} md={8}>  

                    {loading?<LoadingOutlined className="text-danger h1 text-center"/> :<h4 className="text-center mt-3 mb-4"> Create Product </h4>}
                    <hr/>
                    <div className="mb-4">
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductCreate;


