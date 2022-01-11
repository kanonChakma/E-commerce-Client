import React, { useEffect, useState } from 'react';
import { getCategory } from '../../common/category';
import ProductCard from '../../Component/Cards/ProductCard'
const AllCategory = ({match}) => {
    const[category,setCategory]=useState({})
    const[product,setProduct]=useState([])
    const[loading,setLoading]=useState(false);

    const {slug}=match.params;
  
    useEffect(()=>{
      setLoading(true)
      getCategory(slug)
      .then((res)=>{
         setCategory(res.data.category)
         setProduct(res.data.product)
         setLoading(false);
       })
  },[])
    return (
        <div className='container'>
          <div className='row'>
             {
               loading?<h4 className='col text-center jumbotron display-4 m-3 p-3'>Loading....</h4>:
               <h4 className='col text-center jumbotron display-4 mt-3 mb-3 p-3'>
                   All {category.name} related products
               </h4>
            }
          </div>
          <div className='row'>
              {
                  product.map((p)=>(
                    <div className='col-md-4' key={p._id}>
                          <ProductCard product={p}/>           
                     </div>
                  ))
              }
          </div>
        </div>
    );
};
export default AllCategory;
