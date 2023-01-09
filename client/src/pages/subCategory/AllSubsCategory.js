import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { getSubCategorie } from '../../common/subCategory';
import ProductCard from '../../Component/Cards/ProductCard';

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
      <Container maxWidth="lg">
      <Grid   sx={{marginTop:"50px", height: {sx:"auto", md:"65vh"}}}>
          <div className='row'>       
             {
               loading?<h4 className='col text-center jumbotron display-4 m-3 p-3'>Loading....</h4>:
               <h4 className='col text-center jumbotron display-4 mt-3 mb-3 p-3'>
                   {subs.name} 
               </h4>
             }
          </div>
          <Grid container>
            { product.length<1?(<>
                <p>There is no such {subs.name} related products</p>
              </>):(
              product.map((p)=>(
                <Grid item xs={12} sm={6} md={3} p={1} key={p._id}>
                      <ProductCard product={p}/>           
                  </Grid>
              ))
            )
            }
           </Grid>
         </Grid>
       </Container>
    );
};
export default AllSubsCategory;
