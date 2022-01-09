import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProduct, getRelated, starProduct } from '../common/product';
import ProductCard from '../Component/Cards/ProductCard';
import SingleProduct from '../Component/Cards/SingleProduct';

const ProductInfo = ({match}) => {
    const[product,setProduct]=useState({});
    const[related,setRelated]=useState([]);
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
           matchRatting && setStar(matchRatting.star);
         }
    });
    
    const loadProduct=()=>{
        getProduct(slug)
        .then((res)=>{
            setProduct(res.data)
            //Get Related
            getRelated(res.data._id).then((res)=>setRelated(res.data))
         })
    }
    //---------------
    const productRating=(newRating, name)=>{
        setStar(newRating);
        starProduct(name,newRating,user.token)
        .then((res)=>{
             loadProduct();
        });
    }
    console.log(product);
    console.log(related);
    return (
           <div className='container-fluid'>
               <div className='row pt-5'>
                 <SingleProduct product={product} productRating={productRating} star={star}/>
               </div>
               <div className='row'>
                 <h1  className='text-center col mt-3 mb-3 p-3 bg-info'>Related Product</h1>
               </div> 
               <div className='row'>
                 {
                   related.length?related.map((r)=>(
                        <div className='col-md-4'>
                           <ProductCard key={r._id} product={r}/>
                        </div>
                      )):<div className='col text-center h4 font-wight-bold'>No Such Product </div>
                 }
               </div> 
          </div>
      );
 };

export default ProductInfo;