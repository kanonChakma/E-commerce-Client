import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCategory,getCategories,deleteCategory } from '../../../common/category';
import AdminNav from '../../nav/AdminNav';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import CreateProductForm from '../../Form/CreateProductForm';
import SearchProductForm from '../../Form/SearchProductForm';

const CreateProduct=() =>{
    const {user}=useSelector((state) =>({...state}))
    
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const [Category,setCategory]=useState([])
    const[keyword,setKeyword]=useState("");

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

      createCategory({name},user.token)
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md">
                    {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary">Create Product</h4>}
                    
                    <CreateProductForm 
                    handleSubmit={handleSubmit} 
                    name={name} 
                    setName={setName}/>

                   {/*----------step-2-----------*/}
                    <SearchProductForm keyword={keyword} setKeyword={setKeyword}/>

                    <h2>All categories length is ${Category.length}</h2>
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
                </div>
          </div>
      </div>
   )
}
export default CreateProduct;
