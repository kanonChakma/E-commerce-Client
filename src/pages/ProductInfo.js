import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProduct, starProduct } from '../common/product';
import SingleProduct from '../Component/Cards/SingleProduct';

const ProductInfo = ({match}) => {
    const[product,setProduct]=useState({});
    const{slug}=match.params;
    const[star,setStar]=useState(0)
    const {user}=useSelector((state)=>({...state}))

    useEffect(()=>{
        loadProduct();
    },[slug])
    
    useEffect(()=>{
        if(product.ratings && user){
          const matchRatting=product.ratings.find((r)=>(
                r.postedBy.toString() === user._id.toString()
           ))  
           console.log(matchRatting);
           matchRatting && setStar(matchRatting.star);
         }
    });
    
    const loadProduct=()=>{
        getProduct(slug)
        .then((res)=>{
            console.log(res.data);
            setProduct(res.data)
         })
    }
    //---------------
    const productRating=(newRating, name)=>{
        setStar(newRating);
        starProduct(name,newRating,user.token)
        .then((res)=>{
             console.log(res.data);
             loadProduct();
        });
    }
    return (
           <div className='container-fluid'>
               <div className='row pt-5'>
                 <SingleProduct product={product} productRating={productRating} star={star}/>
               </div>
               <div className='row'>
                 <h1  className='text-center col mt-3 mb-3 p-3 bg-info'>Related Product</h1>
               </div>  
          </div>
      );
 };

export default ProductInfo;