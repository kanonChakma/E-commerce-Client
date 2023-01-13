import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Card, Tabs, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import { avarageRatting } from '../../common/ratting';
import { createUserWishList } from '../../common/user';
import "../../css/overrudes.css";
import laptop from '../../image/laptop.jpg';
import RattingModal from '../Modal/RattingModal';
import ProductListItems from './ProductListItems';


const { TabPane } = Tabs;

const SingleProduct = ({product,productRating,star}) => {
    const{title,description,images,_id}=product;
    const[toolTip,setToolTip]=useState("click to Add")
    //Redux
    const{user,cart}=useSelector((state)=>({...state}))
    const dispatch=useDispatch();
    const history=useHistory()

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
    const hanleWhisList=(e)=>{
       e.preventDefault()
       createUserWishList(product._id,user.token)
       .then((res)=>{
          if(res.data.ok){
             toast.success("added wishlist")
             history.push("/user/wishlist")
            }
       })
    }
    return (
        <Grid 
        container
        spacing={3}
      >
           <Grid mt-4 item xs={12} sm={12} md={6} lg={6}>
                 {images &&images.length?
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                      {
                       images && images.map((im)=> <img alt='img'  src={im.url} key={im.public_id} />)
                      }
                  </Carousel>:
                 <Card
                     style={{ height: 450 }}
                     cover={
                        <img
                           alt="example"
                           src={laptop}
                        />
                     }
                 >
                 </Card>
                }
               <div>
               <Tabs type="card">
                  <TabPane tab="Description" key="1" style={{textAlign:"justify"}}>
                    {description && description}
                  </TabPane>
                  <TabPane tab="More" key="2">
                     Please Contact With Us
                  </TabPane>
               </Tabs>
               </div> 
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <h2 className='text-center bg-info p-3'>{title}</h2>
              {product && product.ratings&& product.ratings.length>0?
                 avarageRatting(product): <div className='text-center'>No Rating Yet</div>
              }
              <Card
                hoverable
                actions={[
                 <>
                     <Tooltip title={toolTip}>
                        <a onClick={handleAddToCart}>
                            <ShoppingCartOutlined className='text-success'/> <br/> Add to Cart
                        </a>
                     </Tooltip>
                 </>,
                 <a onClick={hanleWhisList}>
                    <HeartOutlined  className='text-info' /> <br/>
                    <Link>
                       Add To Whislist
                    </Link>
                 </a>,
                 <>
                    <RattingModal>
                     <StarRatings
                        isSelectable={true}
                        rating={star}
                        starRatedColor="blue"
                        changeRating={productRating}
                        numberOfStars={5}
                        name={_id}
                     />
                  </RattingModal>
                 </>
                  ]}
                >
                  <ProductListItems product={product}/>
               </Card>
             </Grid>
        </Grid>    
    );
};

export default SingleProduct;
