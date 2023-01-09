import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProducts, totalProduct } from '../../common/product';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';

const NewArrivals = () => {
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);

    const[currentPage,setCurrentPage]=useState(1);
    const[productCount,setProductCount]=useState(0);

    useEffect(()=>{
        loadProduct();
    },[currentPage])

    useEffect(()=>{
        totalProduct()
        .then((res)=>{
            setProductCount(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const loadProduct=()=>{
        setLoading(true)
        getProducts('createdAt','desc',currentPage)
        .then((res)=>{
            setProducts(res.data)
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
            <Container maxWidth="lg">
                {loading? <LoadingCard count={products.length}/>: 
                <Grid container sx={{ justifyContent: "space-between" }}>
                {
                   products.map((product)=>(
                     <Grid item xs={12} sm={6} md={3} p={1} key={product._id} >
                         <ProductCard
                          product={product}
                         />
                    </Grid>
                   ))  
                 }                 
             </Grid>
                }
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    my={5}
                    >

                    <Grid item xs={3}>
                        <Pagination
                        current={currentPage}
                        total={(productCount/4)*10}
                        onChange={(value)=>setCurrentPage(value)}
                        />
                    </Grid>   
                    
                    </Grid> 
        </Container>
    );
};
export default NewArrivals;

// <div className='row text-center offset-md-5 pt-5 p-3'>
// <Pagination
//     current={currentPage}
//     total={(productCount/3)*10}
//     onChange={(value)=>setCurrentPage(value)}
//     />
// </div>