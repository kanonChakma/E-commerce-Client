import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Container, Grid } from '@mui/material';
import { Card, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserWishList, updateUserWishList } from '../../common/user';
import laptop from "../../image/laptop.jpg";
import UserNav from '../Nav/UserNav';

const WishList=() => {
  const{user}=useSelector((state)=>({...state}));
  const[whisList,setWishList]=useState([]);
  
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
   <Container>
    <Grid 
    sx={{marginTop:"50px", height: {sx:"auto", md:"60vh"}}}
    container>
      <Grid item xs={12} sm={2}>
        <UserNav/>
      </Grid>
      <Grid item xs={12} sm={1}>
       </Grid>
   <Grid item xs={12} sm={9}>
    <Grid 
    style={{
      boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
      padding:"10px 20px",
    }}
    container>
      {
        whisList.map((p)=>(
         <Grid key={p._id} item xs={12} sm={6} md={4} lg={3}>
             <Card
              style={{ width: 300, cursor:"pointer", padding:"5px"}}
              cover={
                <div style={{overflow:"hidden",height:"200px"}}>
                <img
                  style={{height:"100%",
                  width:"100%",
                  objectFit:"cover"}
                  }
                  alt="example"
                  src={p.images.length>0?p.images[0].url:laptop}
                />
                </div>
              }
              actions={[
                <Link to={`/product/${p.slug}`}>
                  <EyeOutlined/><br/> View Product
                </Link>,
                <Tooltip title={p.quantity<1?"":"delete Product"}>
                  <a onClick={()=>handleRemove(p._id)}>
                     <DeleteOutlined key="delete" /><br/>Delete Product
                  </a>
                </Tooltip>,
              ]}
              >
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

// <a onClick={()=>handleRemove(p._id)}>
//                     <DeleteOutlined key="delete" />
//                 </a>,