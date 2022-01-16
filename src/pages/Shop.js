import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {getProductByCount, getProductByFilter} from '../common/product';
import ProductCard from '../Component/Cards/ProductCard';

const Shop = () => {
    const[product,setProduct]=useState([])
    const[loading,setLoading]=useState(false)
    const{search}=useSelector((state)=>({...state}))
    const{text}=search;
     console.log(text);
    useEffect(()=>{
        loadAllProduct()
    },[])
    const loadAllProduct=()=>{
        setLoading(true)
        getProductByCount(5)
        .then((res)=>{
            setProduct(res.data)
            setLoading(false)
        });
    };

    //---------using user search--------
    useEffect(()=>{
      const delayed=setTimeout(()=>{
        fetchAllProducts({query:text})
      },300)
      return ()=>clearTimeout(delayed) 
    },[text])

   const fetchAllProducts=(arg)=>{
        getProductByFilter(arg)
        .then((res)=>{
            console.log(res.data);
            setProduct(res.data)
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-3'>
                  Search product
              </div>
              <div className='col-md-9'>
                 <div className='row'>
                   {
                      loading?(
                          <h4 className='text-danger'>loading...</h4>
                      ):(
                          <h4 className='text-center col  mt-5 mb-3 p-3 display-4 font-wight-bold'>Product List</h4>
                      )
                   }
                 </div>
                  {product.length<1 && <p>No prodouct found</p>}
                 <div className='row'>
                   {
                      product.map((p)=>(
                          <div key={p._id} className='col-md-4'>
                              <ProductCard product={p}/>
                          </div>
                      ))
                    }
                 </div>
              </div>
            </div>
        </div>
    );
};

export default Shop;