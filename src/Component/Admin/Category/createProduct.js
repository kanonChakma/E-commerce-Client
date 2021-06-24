import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory } from '../../../common/category';
import AdminNav from '../../Nav/AdminNav';

const createProduct=() =>{
    
    const {user}=useSelector((state) =>({...state}))
    
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState("");

    const handleSubmit =(e) => {
      e.preventDefault();
      setLoading(true)

      createCategory({name},user.token)
     .then((res) =>{
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} are created`);
      })
      .catch((error) =>{
          setLoading(false);
          if(error.response.status===400) toast.error(`${error.response.data}`)
      })
    }

    const createProductForm=() =>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                type="text"
                onChange={(e) => setName(e.target.value)} 
                className="form-control"
                placeholder="Enter the product name"
                value={name}
                autoFocus
                required
                />
            </div>
        </form>
    )
    return (
        <div className="container-fluid">
        <div className="row">
           <div className="col-md-2">
              <AdminNav/>
           </div>
           <div className="col-md">
             {loading?<h4 className="text-danger">Loading...</h4>:<h4 className="text-secondary">Create Product</h4>}
             {createProductForm()}
           </div>
        </div>
    </div>
  )
}
export default createProduct;
