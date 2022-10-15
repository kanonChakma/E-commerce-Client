import { Container } from '@mui/material';
import { Carousel } from 'antd';
import React from 'react';
import dekstop from '../../image/dekstop.jpg';
import headphone from "../../image/headphone.jpg";
import keyboard from '../../image/keyboard.jpg';
import laptop from "../../image/laptop.jpg";

const Carousele = () => {
  const contentStyle = {
    height:"350px",
    width:"100%",
    objectFit:"cover",
    };
    return (
        <Container maxWidth="lg">
            <Carousel 
             autoplay
             autoplaySpeed={3000}>
              <div >
                 <img alt="img" src={dekstop} style={contentStyle}/>
              </div>
              <div >
                <img  alt="img" src={keyboard} style={contentStyle}/>
              </div>
              <div >
                <img alt="img" src={laptop} style={contentStyle}/>
              </div>
              <div >
                <img  alt="img" src={headphone} style={contentStyle}/>
              </div>
            </Carousel>
        </Container>
    );
};

export default Carousele;