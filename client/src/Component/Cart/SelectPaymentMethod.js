import { Container, Grid } from '@mui/material';
import { Card } from 'antd';
import React from 'react';
import cash1 from "../../image/cash1.jpg";
import stripe from "../../image/stripe.png";
const { Meta } = Card;

const SelectPaymentMethod = ({history}) => {
    return (
        <Container>
              <h4 className='mt-5 mb-1 text-center'>Select Payment Methods</h4>
            <Grid
             sx={{
              spacing : "0",
              alignItems : "center",
              justifyContent : "center"
             }} 
              style={{ minHeight: '60vh' }}
              container>
                 <Grid item xs={12} sm={3} mt={3}>
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
                </Grid>
                <Grid item xs={12} sm={1} mt={3}></Grid>
                <Grid item xs={12} sm={3} mt={3}>
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default SelectPaymentMethod;