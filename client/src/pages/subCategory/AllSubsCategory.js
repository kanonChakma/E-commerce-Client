import React, { useEffect, useState } from 'react';
import { getSubCategorie } from '../../common/subCategory';
import ProductCard from '../../Component/Cards/ProductCard'

const AllSubsCategory = ({match}) => {
    const[subs,setSubs]=useState({})
    const[product,setProduct]=useState([])
    const[loading,setLoading]=useState(false);

    const {slug}=match.params;
  
    useEffect(()=>{
      setLoading(true)
      getSubCategorie(slug)
      .then((res)=>{
          console.log(res.data)
         setSubs(res.data.subs)
         setProduct(res.data.product)
         setLoading(false);
       })
  },[slug])
    return (
        <div className='container'>
          <div className='row'>
             {
               loading?<h4 className='col text-center jumbotron display-4 m-3 p-3'>Loading....</h4>:
               <h4 className='col text-center jumbotron display-4 mt-3 mb-3 p-3'>
                   All Related Products in {subs.name} sub Category
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
export default AllSubsCategory;
