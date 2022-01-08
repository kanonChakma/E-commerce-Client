import React, { useEffect } from 'react';
import { useState } from 'react';
import { getProducts,totalProduct } from '../../common/product';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
import { Pagination } from 'antd';


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
                 <div className='row text-center offset-md-4 pt-5 p-3'>
                    <Pagination
                        current={currentPage}
                        total={(productCount/3)*10}
                        onChange={(value)=>setCurrentPage(value)}
                        />
                </div>
        </div>
    );
};
export default NewArrivals;