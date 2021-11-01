import React, { useEffect, useState } from 'react'
import { getProducts } from '../../common/product';
import AdminProductCard from '../AdminProductCard/AdminProductCard';
import AdminNav from '../nav/AdminNav';

const AdminDashboard= () =>{
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);
   
    useEffect(()=>{
        getAllProducts()
    },[])
    const getAllProducts=()=>{
        setLoading(true);
        getProducts(100)
        .then((res)=>{
           setLoading(false);
           setProducts(res.data);
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err);
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                  <AdminNav/>
               </div>
                  <div className="col-md">
                     <div className="row">
                        {
                           products.map((product)=>(
                            <div className="col-md-4" key={product._id}>
                                  <AdminProductCard
                                    product={product}
                                  />
                               </div>   
                              )) 
                            }
                     </div> 
                 </div>
            </div>
        </div>
    )
}

export default AdminDashboard;