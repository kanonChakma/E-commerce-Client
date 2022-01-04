import React, { useEffect } from 'react';
import { useState } from 'react';
import { getProducts } from '../common/product';
import LoadingCard from '../Component/Cards/LoadingCard';
import ProductCard from '../Component/Cards/ProductCard';
import TypeEffect from '../Component/Cards/TypeEffect';

const Home = () => {
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        loadProduct();
    },[])
    const loadProduct=()=>{
        setLoading(true)
        getProducts(2)
        .then((res)=>{
            setProducts(res.data)
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    console.log(products);
    return (
        <div>
             <div className='jumbotron text-center h1 font-weight-bold'>
               <TypeEffect
                 text={["Latest Product","New Arrivals","Best sellers"]}
               />
             </div>
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
        </div>
    );
};

export default Home;