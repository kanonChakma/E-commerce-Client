import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../../../common/category';
import { getSubCategorie, updateSubCategory } from '../../../common/subCategory';
import CreateProductForm from '../../Form/CreateProductForm';
import AdminNav from '../../Nav/AdminNav';


const SubUpdate=({match,history})=>{
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const [categories,setCategories]=useState([]);
  const [parent,setParent]=useState("")

const {user}=useSelector((state)=>({...state}));
//-----------------------Load all product-----------------------------
  useEffect(()=>{
      loadCategories();
      loadSubCategorie();
  },[])
  const loadCategories=()=>{
    getCategories()
    .then((res)=>setCategories(res.data))
    .catch(err=>console.log(err))
  }
  const loadSubCategorie=()=>{
     getSubCategorie(match.params.slug)
    .then((res)=>{
        // console.log("Hello this is response",res.data[0]);
        setName(res.data[0].name);
        setParent(res.data[0].parent)
    })
    .catch(err=>toast.error(err))    
  } 

//---------------submit form--------------------
const handleSubmit=(e)=>{
       e.preventDefault();
       setLoading(true);
        updateSubCategory(match.params.slug,{name,parent},user.token)
       .then((res)=>{
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} are created`);
        history.push("/admin/sub");
       })
       .catch(err=>{
        setLoading(false);
        toast.error(err.message);
        if(err.status===400) toast.error(`${err.message}`)
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
                    {loading?<h1 className="text-danger">Loading....</h1>:<h4 className="text-secondary text-center mb-4 mt-3">Update SubCategory</h4>}  
                     {/*----------step-2-----------*/}
                   <div className="form-group">
                        <h5 className='text-success'>Select Category</h5>
                        <select name="category" className="form-control" onChange={e=>setParent(e.target.value)}>
                            {
                               categories.length>0 && categories.map((c)=>(
                               <option key={c._id} value={c._id} selected={c._id===parent}>{c.name}</option>
                               ))
                             }
                        </select>
                   </div>

                   <CreateProductForm
                     handleSubmit={handleSubmit}
                     name={name}
                     place="Enter subcategory name"
                     text="update"
                     setName={setName}
                   />
            </Grid>  
      </Grid>
     </Container> 
   );
}
export default SubUpdate;
