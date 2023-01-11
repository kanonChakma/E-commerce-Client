import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCategory, deleteCategory, getCategories } from '../../../common/category';
import CreateProductForm from '../../Form/CreateProductForm';
import FileUpload from '../../Form/FileUpload';
import SearchProductForm from '../../Form/SearchProductForm';
import AdminNav from '../../Nav/AdminNav';

const CreateProduct=()=>{
    const {user}=useSelector((state) =>({...state}))
    
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const [Category,setCategory]=useState([])
    const[keyword,setKeyword]=useState("");
    
    const[values,setValues]=useState({images:[]});

    
 //load all products
    useEffect(() => {
       loadCategories();
    },[])
     const loadCategories=()=>{
          getCategories()
         .then((res)=>setCategory(res.data))
         .catch(error =>console.log(error.message));
     }
     
//---------------------------
//remove products
     const handleRemove=(slug)=>{
        if(window.confirm("confirm delete")){
            deleteCategory(slug,user.token)
            .then((res)=>{
                console.log(res);
                loadCategories();
                toast.success(`${res.data.name} deleted`)
              })
          .catch((err)=>console.log(err.message)) 
         }
     }
 //------------------------------
const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword);

//-----------------------------
  const handleSubmit =(e) => {
      e.preventDefault();
      setLoading(true)

      createCategory({name, images: values.images},user.token)
     .then((res) =>{
         console.log(res);
        loadCategories();
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} are created`);
      })
      .catch((error) =>{
          console.error(error.message);
          setLoading(false);
          toast.error(error.message);
          if(error.status===400) toast.error(`${error.message}`)
      })
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
                    {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary text-center mt-3 mb-4">Create Product Category</h4>}
                    
                    <div className="mb-4">
                        <FileUpload 
                        values={values} 
                        setValues={setValues}
                        setLoading={setLoading}
                        />
                  </div>
                    <CreateProductForm 
                    text="create"
                    place="Enter the category name"
                    handleSubmit={handleSubmit} 
                    name={name} 
                    setName={setName}/>

                   {/*----------step-2-----------*/}
                    <SearchProductForm     place="Search Category" keyword={keyword} setKeyword={setKeyword}/>

                    <h2 className='text-center my-2'>All Categories</h2>
                    {Category.filter(searched(keyword)).map((product) => (
                        <div className="alert alert-secondary" key={product._id}>
                            {product.name}
                            <Link to={`/admin/category/${product.slug}`}>
                               <span className="btn btn-small float-right">
                                   <EditOutlined />
                               </span>
                           </Link>
                           <span
                           onClick={() =>handleRemove(product.slug)} 
                           className="btn btn-small float-right">
                                <DeleteOutlined />
                           </span>
                        </div>
                       )
                     )}
             </Grid>
         </Grid>
      </Container>
   )
}
export default CreateProduct;
