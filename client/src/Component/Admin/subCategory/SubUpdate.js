import React, {useEffect,useState} from 'react';
import AdminNav from '../../Nav/AdminNav';
import CreateProductForm from '../../Form/CreateProductForm'
import {useSelector} from 'react-redux';
import {getCategories} from '../../../common/category'
import  {getSubCategorie, updateSubCategory} from '../../../common/subCategory'
import { toast } from 'react-toastify';


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
                               <option key={c._id} value={c._id} selected={c._id===parent}>{c.name}</option>
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
export default SubUpdate;
