import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { getCategory } from '../../common/category';
import ProductCard from '../../Component/Cards/ProductCard';
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
  },[slug])
    return (
        <Container maxWidth="lg">
          <Grid   sx={{marginTop:"50px", height: {sx:"auto", md:"65vh"}}}>
            <div className='row'>
            {
              loading?<h4 className='col text-center jumbotron display-4  p-3'>Loading....</h4>:
              <h4 className='col text-center jumbotron display-4  p-3'>
                {category.name}
              </h4>
          }
        </div>
        <Grid container>
            { product.length<1?(<>
                <p>There is no such {category.name} related products</p>
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
export default AllCategory;
