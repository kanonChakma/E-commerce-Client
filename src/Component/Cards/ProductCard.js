import React from 'react';
import { Card, Avatar } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import img from '../../image/first.jpg'
import { Link } from 'react-router-dom';
import { avarageRatting } from '../../common/ratting';
const { Meta } = Card;

const ProductCard = ({product}) => {
    const{title,description,images,slug}=product;

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
            <Link>
                <ShoppingCartOutlined key="delete"/> <br/> Add to Cart
            </Link>,
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