import { LoadingOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../common/category';
import CreateProductForm from '../../Form/CreateProductForm';
import FileUpload from '../../Form/FileUpload';
import AdminNav from '../../Nav/AdminNav';

const UpdateProduct=({history,match}) =>{
    const {user}=useSelector((state) =>({...state}))
       
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const[values,setValues]=useState({images:[]});
    const {slug}=useParams();
    
 
    useEffect(() => {
       loadCategory();
    },[])

     const loadCategory = () => {
          getCategory(match.params.slug)
         .then((res)=>setName(res.data.category.name))
         .catch(error =>console.log(error.message));
     }

    const handleSubmit =(e) => {
      e.preventDefault();
      setLoading(true)

      updateCategory(match.params.slug,{name, images: values.images},user.token)
     .then((res) =>{
        console.log(res)
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} are created`);
        history.push("/admin/dashboard")
      })
      .catch((error) =>{
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
                    {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary text-center mb-4 mt-3">Update Product Category</h4>}
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
                    <CreateProductForm 
                    place="Enter the category name"
                    text="update"
                    handleSubmit={handleSubmit}
                    name={name} 
                    setName={setName}/>
                </Grid>
            </Grid>
      </Container>
   )
}
export default UpdateProduct;
