
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../common/category';

const CategoryList = () => {
    const[category,setCategory]=useState([]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        setLoading(true)
        getCategories()
      .then((res)=>{
          setCategory(res.data)
          setLoading(false)
      })
    },[])

    let ShowCategory=()=>{
      category.map((c)=>(
      <div 
      key={c._id} 
      className='btn btn-outlined-primary btn m-3'>
          {c.name}
        </div>
        )
       )
    }
    return (
        <div className='container'>
          <div className='row'>
              {loading?(<h4 className='text-center'>Loading..</h4>):(
                category.map((c)=>(
                    <div 
                    key={c._id} 
                    className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
                        <Link to={`/category/${c.slug}`}> {c.name}</Link>
                      </div>
                   ))
               )}
          </div>
        </div>
    );
};

export default CategoryList;