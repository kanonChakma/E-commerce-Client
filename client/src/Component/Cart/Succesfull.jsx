import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../image/payment.jpg';
import Canvas from './Canvas';



const useStyles = makeStyles(theme => ({
    card: {
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${img})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        textAlign:"center",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        fontSize: "50px",
        color: "green",
    },
    linkColor: {
        color:"white"
    }
  }));

const Succesfull = () => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

  return (
    <Grid
    className={classes.card}
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >

  <Grid item xs={3}>
     <Box>
         <CheckCircleOutlineIcon className={classes.icon}/>
          <Typography variant="h3" gutterBottom>
            Payment Completed Succesfully
          </Typography>
         <Link
          className={classes.linkColor}
          to="/user/history">
          See it in your purchase
         </Link>
     </Box>
     <Canvas />
  </Grid>   
   
</Grid> 
  )
}

export default Succesfull