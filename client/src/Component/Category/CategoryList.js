
import { Box, Card, CardMedia, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../common/category';
import "../../css/hover.css";
import img from "../../image/first.jpg";

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
 media: {
    display: 'flex',
    height: "100%",
    objectFit: 'contain',
},
}));

const CategoryList = () => {
  const classes = useStyles();
    const[category,setCategory] = useState([]);
    const[loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getCategories()
      .then((res)=>{
         console.log(res)
          setCategory(res.data)
          setLoading(false)
      })
    },[])

    return (
        <Container maxWidth="lg">
          <Grid  container>
              {loading?(<h4 className='text-center'>Loading..</h4>):(
                category.map((c)=>(
                    <Grid item xs={12} sm={3} pl={1} mb={2}>
                    <Card sx={{ maxWidth: 300, maxHeight:170,color:"black", margin:"0 auto", border:"none", borderRadius:"0px"}}>
                     <Box className='column' id='caption'>
                       <span class = "text">
                         <Link to={`/category/${c.slug}`}> 
                             <h6>{c.name}</h6>
                          </Link>
                        </span>
                        <figure>
                        <CardMedia
                        component="img"
                        height="100%"
                        width="100%"
                        image={c.images?c.images[0].url:img}
                        alt="Paella dish"
                        objectFit="contain"
                        />
                        </figure>
                        </Box>
                     </Card>
                     </Grid>     
                   ))
               )}
          </Grid>
        </Container>
    );
};

export default CategoryList;

// <Box className='column' id='caption' >
// <span class = "text">
//   <Link to={`/category/${c.slug}`}> 
//       <h6>{c.name}</h6>
//   </Link>
// </span>
// <figure>
//   <CardMedia
//     component="img"
//     height="100%"
//     width="100%"
//     image={img}
//     alt="Paella dish"
//     objectFit="contain"
//    />
//  </figure> 
// </Box>  