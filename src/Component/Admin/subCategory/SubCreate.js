import React, {useEffect,useState} from 'react';
import AdminNav from '../../Nav/AdminNav';
import CreateProductForm from '../../Form/CreateProductForm'
import {useSelector} from 'react-redux';
import {getCategories} from '../../../common/category'
import  {createSubCategory, deleteSubCatgory, getSubCategories} from '../../../common/subCategory'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SearchProductForm from '../../Form/SearchProductForm';

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
const handleRemove=(slug)=>{
  if(window.confirm("confirm delete")){
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

                  <SearchProductForm keyword={keyword} setKeyword={setKeyword}/> 
                 
                  <h2>{subCategory.length} subCategories Exist</h2>
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
               </div>  
          </div>
     </div> 
   );
}
export default SubCreate;
