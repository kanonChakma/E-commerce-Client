import { Card } from 'antd';
import React from 'react';
import cash1 from "../../image/cash1.jpg";
import stripe from "../../image/stripe.png";
const { Meta } = Card;
const SelectPaymentMethod = ({history}) => {
    return (
        <div className='container'>
              <h4 className='mt-3 mb-3'>Select Payment Methods</h4>
            <div className='row'>
                 <div className='col-md-3'>
                 <Card
                   onClick={()=>history.push("/payment")} 
                  hoverable
                  style={{ width: 240 }}
                 cover={
                  <div style={{overflow:"hidden",height:"100px"}}>
                    <img
                    alt='img'
                    style={{height:"100%",
                        width:"100%",
                        objectFit:"cover"}
                        }
                    src={stripe}
                    />
                   </div>
                 }
               >
                   <Meta title="Stripe Payment" />
                </Card>
                </div>
                <div className='col-md-3'>
                <Card
                 hoverable
                 onClick={()=>history.push("/cash-payment")} 
                  style={{ width: 240 }}
                 cover={
                  <div style={{overflow:"hidden",height:"100px"}}>
                    <img
                    alt='img'
                    style={{height:"100%",
                        width:"100%",
                        objectFit:"cover"}
                        }
                    src={cash1}
                    />
                   </div>
                 }
               >
                   <Meta title="Cash On Delivery" />
                </Card>
                </div>
            </div>
        </div>
    );
};

export default SelectPaymentMethod;