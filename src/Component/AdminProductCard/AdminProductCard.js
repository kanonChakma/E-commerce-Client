import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const AdminProductCard = ({product}) => {
    const{title,description,images}=product;
    return (
        <Card
        hoverable
        cover={
            <div style={{ overflow: "hidden", height: "280px" }}>
            <img
              style={{ height: "100%" ,width:"100%",objectFit:"cover"}}
              src={images&&images.length?images[0].url:""}
            />
          </div>
          }
        >
        <Meta title={title} description={description} />
      </Card>
    );
};

export default AdminProductCard;