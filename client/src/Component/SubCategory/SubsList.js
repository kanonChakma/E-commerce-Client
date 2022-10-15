
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubCategories } from '../../common/subCategory';

const CategoryList = () => {
    const[subs,setSubs]=useState([]);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        setLoading(true)
        getSubCategories()
      .then((res)=>{
          setSubs(res.data)
          setLoading(false)
      })
    },[])


    return (
        <Container maxWidth="laptop">
          <div className='row'>
              {loading?(<h4 className='text-center'>Loading..</h4>):(
                subs.map((c)=>(
                    <div 
                    key={c._id} 
                    className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
                        <Link to={`/sub/${c.slug}`}> {c.name}</Link>
                      </div>
                   ))
               )}
          </div>
        </Container>
    );
};

export default CategoryList;