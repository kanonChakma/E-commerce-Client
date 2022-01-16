import React, { useEffect, useState } from 'react';
import AdminProductCard from '../../Cards/AdminProductCard';
import AdminNav from '../../nav/AdminNav';
import { getProductByCount, removeProduct } from '../../../common/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const AllProducts = () => {
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);
    const {user}= useSelector((state)=>({...state}))

    useEffect(()=>{
        getAllProducts()
    },[])
    const getAllProducts=()=>{
        setLoading(true);
        getProductByCount(100) 
        .then((res)=>{
           setLoading(false);
           setProducts(res.data);
         })
        .catch((err)=>{
            setLoading(false)
            console.log(err);
         })
     }
    const handleRemove=(slug)=>{
      const answer=window.confirm("Dlete");
      if(answer){
               removeProduct(slug,user.token)
              .then((res)=>{
                getAllProducts();
                toast(`${res.data.title} has been deleted`)
               })
              .catch((err)=>{
                if(err.response.status===4000) toast.error(err.response.data)
                console.log(err)
             })
         }
    }  
    return(
        <div className="container-fluid">
        <div className="row">
              <div className="col-md-2">
                  <AdminNav/>
              </div>
              <div className="col-md">
                  {loading?<h4 className="text-danger text-center mb-3">Loading......</h4>:<h4 className="text-Primary text-center mb-3">All Products</h4>}
                 <div className="row">
                    {
                       products.map((product)=>(
                           <div className="col-md-4 pb-3" key={product._id}>
                              <AdminProductCard
                                 product={product}
                                 handleRemove={handleRemove}
                              />
                            </div>   
                          )) 
                      }
                 </div> 
             </div>
        </div>
     </div>
    );
};

export default AllProducts;