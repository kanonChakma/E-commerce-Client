import React, {useEffect,useState} from 'react';
import AdminNav from '../../nav/AdminNav';
import CreateProductForm from '../../Form/CreateProductForm'
import {useSelector} from 'react-redux';
import {getCategories} from '../../../common/category'
import  {createSubCategory} from '../../../common/subCategory'
import { toast } from 'react-toastify';

const SubCreate=()=>{
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const [categories,setCategories]=useState([]);
  const [parent,setParent]=useState([])


  const {user}=useSelector((state)=>({...state}));
//Load all product
  useEffect(()=>{
      loadCategories();
  },[])
  const loadCategories=()=>{
    getCategories()
    .then((res)=>setCategories(res.data))
    .catch(err=>console.log(err))
  } 
  const handleSubmit=(e)=>{
       e.preventDefault();
       setLoading(true);
       createSubCategory({name,parent},user.token)
       .then((res)=>{
        setLoading(false);
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
    <div className="container-fluid">
         <div className="row">
             <div className="col-md-2">
                  <AdminNav/>   
              </div>
              <div className="col-md">        
                    {loading?<h1 className="text-danger">Loading....</h1>:<h4 className="text-secondary">Create subProduct</h4>}  
                     {/*----------step-2-----------*/}
                   <div className="form-group">
                        <label>Parent Category {categories.length}</label>
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
                   />

               </div>  
          </div>
     </div> 
   );
}

export default SubCreate;
