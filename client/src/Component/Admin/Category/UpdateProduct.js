import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategory,updateCategory } from '../../../common/category';
import CreateProductForm from '../../Form/CreateProductForm';
import AdminNav from '../../Nav/AdminNav';


const UpdateProduct=({history,match}) =>{
    const {user}=useSelector((state) =>({...state}))
       
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    
    const {slug}=useParams();
    console.log(slug);
    //load all products
    useEffect(() => {
       loadCategory();
    },[])
     const loadCategory=()=>{
          getCategory(match.params.slug)
         .then((res)=>setName(res.data[0].name))
         .catch(error =>console.log(error.message));
     }

    const handleSubmit =(e) => {
      e.preventDefault();
      setLoading(true)

      updateCategory(match.params.slug,{name},user.token)
     .then((res) =>{
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-md">
                    {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary">Update Product</h4>}
                    <CreateProductForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                </div>
            </div>
      </div>
   )
}
export default UpdateProduct;
