import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Card, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { avarageRatting } from '../../common/ratting';
import img from '../../image/first.jpg';
const { Meta } = Card;

const  card = {
  cursior:"pointer",
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
  }
}

const ProductCard = ({product}) => {
    const{title,description,images,slug}=product;
    const[toolTip,setToolTip]=useState("click to Add")
    //Redux
    const{user,cart}=useSelector((state)=>({...state}))
    const dispatch=useDispatch();
  
    const handleAddToCart=()=>{
      let cart=[];
     if(typeof window !== "undefined") {
          if(localStorage.getItem("cart")){
              cart=JSON.parse(localStorage.getItem("cart"));
             }
           cart.push({
              ...product,
              count:1,
            });   
          let unique=_.uniqWith(cart, _.isEqual);
          localStorage.setItem("cart",JSON.stringify(unique)); 
          setToolTip("Added")
          dispatch({
            type:"ADD_TO_CART",
            payload:unique
          })
          dispatch({
            type:"SET_VISIBLE",
            payload:true
          })
       } 
    }
    return (
      <>
          {product && product.ratings&& product.ratings.length>0?
            avarageRatting(product): <Typography textAlign="center" marginBottom={2} variant="body2" gutterBottom>No Rating Yet</Typography> 
            }
        <Card
        style={card}
        cover={
              <img
               style={{height:"170px",
                width:"100%",
                objectFit:"cover" }}
                alt="img"
               src={images&&images.length?images[0].url:img}
              />
         }
        actions={[
            <Link to={`/product/${slug}`}>
                 <EyeOutlined key="edit" /> <br/> View Product 
            </Link>,
            <Tooltip title={product.quantity<1?"":toolTip}>
              <a onClick={handleAddToCart} disabled={product.quantity<1}>
                  <ShoppingCartOutlined/> <br/> 
                  {product.quantity<1?"Stock Out" :"Add to Cart"}
              </a>
            </Tooltip>,
        ]}
      >
        <Meta
          style={{height: "60px"}}
          title={title}
          description={`${description && description.substring(0,30)}......`}
        />
      </Card>   
     </>
    );
};

export default ProductCard;

 




