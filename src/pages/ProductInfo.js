import React, { useEffect, useState } from 'react';
import { getProduct } from '../common/product';
import SingleProduct from '../Component/Cards/SingleProduct';

const ProductInfo = ({match}) => {
    const[product,setProduct]=useState({});
    const{slug}=match.params;

    useEffect(()=>{
        loadProduct();
    },[])
    
    const loadProduct=()=>{
        getProduct(slug)
        .then((res)=>{
            setProduct(res.data)
         })
        .then((err)=>{
            console.log(err);
        })
    }
    return (
         <div className='container-fluid'>
             <div className='row pt-5'>
               <SingleProduct product={product}/>
             </div>
             <div className='row'>
                 <h1  className='text-center col mt-3 mb-3 p-3 bg-info'>Related Product</h1>
             </div>  
         </div>
    );
};

export default ProductInfo;