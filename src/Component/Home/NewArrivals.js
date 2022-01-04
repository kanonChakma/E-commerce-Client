import React, { useEffect } from 'react';
import { useState } from 'react';
import { getProducts } from '../../common/product';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';


const NewArrivals = () => {
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        loadProduct();
    },[])
    const loadProduct=()=>{
        setLoading(true)
        getProducts('CreatedAt','Asc',2)
        .then((res)=>{
            console.log(res.data)
            setProducts(res.data)
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
            <div className='container'>
                {loading? <LoadingCard count={products.length}/>: 
                <div className='row'>
                   {
                      products.map((product)=>(
                          <div className='col-md-4' key={product._id}>
                               <ProductCard
                                product={product}
                               />
                          </div>
                      ))  
                   }
                 </div>
                }
            </div>
    );
};

export default NewArrivals;