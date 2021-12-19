import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import img from '../../image/first.jpg';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const AdminProductCard = ({product,handleRemove}) => {
    const{title,description,images,slug}=product;
    return (
        <Card
        hoverable
        cover={
            <div style={{ overflow: "hidden", height: "250px" }}>
            <img
              style={{ height: "100%" ,width:"100%",objectFit:"cover"}}
              src={images&&images.length?images[0].url:img}
            />
           </div>
          }
          actions={[
              <Link to={`/admin/product/${slug}`}>
                  <EditOutlined key="edit" className="text-danger" />
              </Link>,
             <DeleteOutlined onClick={()=>handleRemove(slug)} className="text-danger"/>
          ]}
        >
        <Meta title={title} description={`${description && description.substring(0,40)}...`} />
      </Card>
    );
};
export default AdminProductCard;
