import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductByCount, removeProduct } from '../../../common/product';
import AdminProductCard from '../../Cards/AdminProductCard';
import AdminNav from '../../Nav/AdminNav';


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
        <Container maxWidth="lg">
          <Grid  sx={{marginTop:"50px", minHeight: {sx:"auto", md:"70vh"}}}
         container>
            <Grid sx={{
                padding:"10px 20px",
                boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                height:{sx:"auto", sm:"450px"}
                }}
                item xs={12}   md={4}  lg={3} >
                <AdminNav/>
            </Grid>
            <Grid item xs={12} md={1} lg={1}></Grid>
            
            <Grid item xs={12} md={7} lg={8}>
                  {loading?<h4 className="text-danger text-center mb-3">Loading......</h4>:<h4 className="text-Primary text-center mb-3">All Products</h4>}
                 <Grid container>
                    {
                       products.map((product)=>(
                           <Grid item key={product._id} pl={1} mb={2} xs={12} sm={3} md={4} lg={3}>
                              <AdminProductCard
                                 product={product}
                                 handleRemove={handleRemove}
                              />
                            </Grid>   
                          )) 
                      }
                 </Grid> 
            </Grid>
        </Grid>
     </Container>
    );
};

export default AllProducts;