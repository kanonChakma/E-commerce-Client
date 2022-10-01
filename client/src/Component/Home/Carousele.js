import React from 'react';
import { Carousel } from 'antd';
import dekstop from '../../image/dekstop.jpg';
import keyboard from '../../image/keyboard.jpg';
import laptop from "../../image/laptop.jpg";
import headphone from "../../image/headphone.jpg"

const Carousele = () => {
  const contentStyle = {
    height:"350px",
    width:"100%",
    objectFit:"cover",
    };
    return (
        <div className='container'>
            <Carousel 
             autoplay
             autoplaySpeed={3000}>
              <div >
                 <img src={dekstop} style={contentStyle}/>
              </div>
              <div >
                <img src={keyboard} style={contentStyle}/>
              </div>
              <div >
                <img src={laptop} style={contentStyle}/>
              </div>
              <div >
                <img src={headphone} style={contentStyle}/>
              </div>
            </Carousel>
        </div>
    );
};

export default Carousele;