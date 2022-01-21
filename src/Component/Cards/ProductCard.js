import React from 'react';
import { Card, Avatar,Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import img from '../../image/first.jpg'
import { Link } from 'react-router-dom';
import { avarageRatting } from '../../common/ratting';
import _ from 'lodash'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
const { Meta } = Card;

const ProductCard = ({product}) => {
    const{title,description,images,slug}=product;
    const[toolTip,setToolTip]=useState("click to Add")
    //Redux
    const{user,cart}=useSelector((state)=>({...state}))
    const dispatch=useDispatch();
  
    const handleAddToCart=()=>{
      let cart=[];
     if(typeof window !== "undefined"){
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
            avarageRatting(product): <div className='text-center'>No Rating Yet</div>
            }
        <Card
        cover={
          <div style={{overflow:"hidden",height:"250px"}}>
              <img
               style={{height:"100%",
                width:"100%",
                objectFit:"cover"}
                }
               src={images&&images.length?images[0].url:img}
              />
          </div>
        }
        actions={[
            <Link to={`/product/${slug}`}>
                 <EyeOutlined key="edit" /> <br/> View Product 
            </Link>,
            <Tooltip title={toolTip}>
              <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined/> <br/> Add to Cart
              </a>
            </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0,30)}......`}
        />
      </Card>   
     </>
    );
};

export default ProductCard;