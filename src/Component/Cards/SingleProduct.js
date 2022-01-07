import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ShoppingCartOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';
import laptop from '../../image/laptop.jpg';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import ProductListItems from './ProductListItems';
import { Tabs } from 'antd';
import RattingModal from '../Modal/RattingModal';
const { TabPane } = Tabs;

const SingleProduct = ({product}) => {
    const{title,description,images,_id}=product;
    return (
        <>
           <div className='col-md-7'>
                 {images &&images.length?
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                      {
                       images && images.map((im)=> <img src={im.url} key={im.public_id} />)
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
                  <TabPane tab="Description" key="1">
                    {description && description}
                  </TabPane>
                  <TabPane tab="More" key="2">
                     Please Contact With Us
                  </TabPane>
               </Tabs>
               </div> 
            </div>
           <div className='col-md-5'>
              <h1 className='text-center bg-info p-3'>{title}</h1>
             <Card
                hoverable
                actions={[
                 <>
                    <ShoppingCartOutlined  className='text-success'/><br/>
                    <Link>
                         Add to Cart
                     </Link>
                 </>,
                 <>
                   <HeartOutlined  className='text-info' /> <br/>
                   <Link>
                       Add To Whislist
                   </Link>
                 </>,
                 <>
                    <RattingModal>
                     <StarRatings
                        isSelectable={true}
                        rating={2}
                        starRatedColor="blue"
                        changeRating={(newRating, name)=>console.log(newRating, name)}
                        numberOfStars={5}
                        name={_id}
                     />
                  </RattingModal>
                 </>
                  ]}
                >
                  <ProductListItems product={product}/>
               </Card>,
             </div>
        </>    
    );
};

export default SingleProduct;
