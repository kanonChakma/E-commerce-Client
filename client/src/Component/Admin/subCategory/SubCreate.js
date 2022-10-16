import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories } from '../../../common/category';
import { createSubCategory, deleteSubCatgory, getSubCategories } from '../../../common/subCategory';
import CreateProductForm from '../../Form/CreateProductForm';
import SearchProductForm from '../../Form/SearchProductForm';
import AdminNav from '../../Nav/AdminNav';

const SubCreate=()=>{
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const [categories,setCategories]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [parent,setParent]=useState("")
  const [keyword,setKeyword]=useState('')

  const {user}=useSelector((state)=>({...state}));
//Load all product
  useEffect(()=>{
      loadCategories();
      loadSubCategories();
  },[])
  const loadCategories=()=>{
    getCategories()
    .then((res)=>setCategories(res.data))
    .catch(err=>console.log(err))
  }
  const loadSubCategories=()=>{
    getSubCategories()
    .then((res)=>setSubCategory(res.data))
    .catch(err=>toast.error(err))    
  } 
//remove product
const handleRemove=(slug) => {
  if(window.confirm("confirm delete")) {
    deleteSubCatgory(slug,user.token)
  .then((res)=>{
     loadSubCategories();
     toast.success(`${res.data.name} deleted`);
  })
 .catch((err)=>toast.error(err)); 
  }
}
//search product
const Search=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword);
console.log(parent);
//submit form
const handleSubmit=(e)=>{
       e.preventDefault();
       setLoading(true);
       createSubCategory({name,parent},user.token)
       .then((res)=>{
        setLoading(false);
        loadSubCategories();
        setName("");
        toast.success(`${res.data.name} are created`);
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
                    {loading?<h1 className="text-danger">Loading....</h1>:<h4 className="text-secondary text-center mb-4 mt-3">Add SubCategory</h4>}  
                     {/*----------step-2-----------*/}
                   <div className="form-group mb-3">
                        <h5 className='text-success'>Selet Category</h5>
                        <select name="category" className="form-control" onChange={e=>setParent(e.target.value)}>
                            {
                               categories.length>0 && categories.map((c)=>(
                               <option key={c._id} value={c._id}>{c.name}</option>
                               ))
                             }
                        </select>
                   </div>

                   <CreateProductForm
                     handleSubmit={handleSubmit}
                     name={name}
                     setName={setName}
                     place="Enter the subCategory name"
                     text="create"
                   />

                  <SearchProductForm 
                  place="Search subCategory"
                  keyword={keyword} 
                  setKeyword={setKeyword}/> 
                 
                  <h2 className='text-center mt-5 mb-3'>All subCategories</h2>
                   {
                     subCategory.filter(Search(keyword)).map((subs)=>(
                       <div className="alert alert-secondary" key={subs._id}>
                          {subs.name}
                          <Link to={`/admin/sub/${subs.slug}`}>
                            <span className="btn btn-small float-right">
                                <EditOutlined />
                            </span>
                          </Link>
                          <span 
                          onClick={()=>handleRemove(subs.slug)}
                          className="btn btn-small float-right">
                              <DeleteOutlined />
                          </span>
                       </div>
                        )
                      )
                    }
            </Grid>  
      </Grid>
     </Container> 
   );
}
export default SubCreate;
