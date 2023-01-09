import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProduct, getRelated, starProduct } from '../common/product';
import ProductCard from '../Component/Cards/ProductCard';
import SingleProduct from '../Component/Cards/SingleProduct';

const ProductInfo = ({match}) => {
    const[product,setProduct]=useState({});
    const[related,setRelated]=useState([]);
    const{slug} = match.params;
    const[star,setStar]=useState(0)
    const {user} = useSelector((state)=>({...state}))

    useEffect(()=>{
        loadProduct();
    },[slug])
    
    useEffect(()=>{
        if(product.ratings && user) {
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
      console.log({newRating}, {name})
        setStar(newRating);
        starProduct(name,newRating,user.token)
        .then((res)=>{
             loadProduct()
        });
    }
    return (
           <Container maxWidth="lg">
               <Grid sx={{marginTop: {xs:"20px", md:"10px"}}}>
                  <SingleProduct product={product} productRating={productRating} star={star}/>
               </Grid>
               <div className='row'>
                 <h2  className=' col mt-5 mb-3 p-3 '>Related Products</h2>
               </div> 
               <Grid container sx={{minHeight: {xs:"auto", md:"55vh"}}} >
                 {
                   related.length?related.map((r)=>(
                        <Grid item xs={12} sm={6} md={3} p={1}>
                           <ProductCard key={r._id} product={r}/>
                        </Grid>
                      )):<div className='col text-center h4 font-wight-bold'>No Such Product </div>
                 }
               </Grid> 
          </Container>
      );
 };
export default ProductInfo;