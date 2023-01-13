import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserWishList, updateUserWishList } from '../../common/user';
import "../../css/hover.css";
import laptop from "../../image/laptop.jpg";
import UserNav from '../Nav/UserNav';

const useStyles = makeStyles(theme => ({
  card: {
    cursor:"pointer",
    maxWidth: 300,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },

  content: {
     height:"20px",
     textAlign: "center",
     padding: theme.spacing.unit * 3
  },

}));


const WishList=() => {
  const{user}=useSelector((state)=>({...state}));
  const[whisList,setWishList]=useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(()=>{
    loadWhisList()
  },[])
  
  const loadWhisList=()=>{
      getUserWishList(user.token)
      .then((res)=>setWishList(res.data.wishList))
  }
  const handleRemove=(productId)=>{
    updateUserWishList(productId,user.token)
    .then(res=>{
      if(res.data.ok){
        toast.success("Remove Product From WhiList");
        loadWhisList()
      }
    })
  }
  return(
   <Container maxWidth="lg">
    <Grid 
    sx={{marginTop:"50px", minHeight: {sx:"auto", md:"70vh"}}}
    container>
      <Grid
       sx={{
        padding:"10px 20px",
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        height:{sx:"auto", sm:"350px"}
       }}
        item xs={12} sm={3}  md={3}>
        <UserNav/>
      </Grid>

      <Grid item xs={12} sm={1} md={1}>
       </Grid>
      
      <Grid item xs={12} sm={8} md={8}>
         <Typography variant="h5"  style={{ justifyContent:"center",marginBottom:"10px", textAlign:"center"}}>
              {whisList.length>0?"Your Wishlist":"wishlist are empty"}
        </Typography>
      <Grid 
       style={{
        padding:"10px 5px",
    }}
    container>
      {
        whisList.map((p)=>(
         <Grid key={p._id} item xs={12} pl={1} sm={6} md={4} mb={1} lg={3}>
            <Card className={`${classes.card} showicon`} onClick={() => history.push(`/product/${p.slug}`)}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="130"
              image={p.images.length>0?p.images[0].url:laptop}
              /> 
            <CardContent style={{height: "0px", marginBottom:"27px"}}>
              <Typography gutterBottom variant="body2" component="div">
                {p.title}
              </Typography>
            </CardContent>
            
            <CardActions sx={{justifyContent:"space-between"}}>
              <Tooltip  title={p.quantity<1?"":"view product"}>
                <IconButton  aria-label="view">
                  <VisibilityIcon fontSize='small' className='edit_hover_class'/> 
                </IconButton> 
              </Tooltip>
              <Tooltip  title={p.quantity<1?"":"delete Product"}>
                  <IconButton onClick={()=>handleRemove(p._id)} aria-label="view">
                    <DeleteOutlineIcon/> 
                  </IconButton>
              </Tooltip>
            </CardActions>
           </Card>
         </Grid>
        ))
      }
      </Grid>
      </Grid>
      </Grid>
   </Container>
  )
}

export default WishList;