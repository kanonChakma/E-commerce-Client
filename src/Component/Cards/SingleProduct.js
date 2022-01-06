import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ShoppingCartOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';
import laptop from '../../image/laptop.jpg';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import ProductListItems from './ProductListItems';
const { Meta } = Card;


const SingleProduct = ({product}) => {
    const{title,description,images}=product;
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
                    <StarOutlined />
                    <Link>
                       Leave Rating
                    </Link>
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
