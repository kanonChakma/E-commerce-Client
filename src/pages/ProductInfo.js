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
             <div className='row'>
               <SingleProduct product={product}/>
             </div>
             <div className='row'>
                <div>Related Product</div>
             </div>  
         </div>
    );
};

export default ProductInfo;