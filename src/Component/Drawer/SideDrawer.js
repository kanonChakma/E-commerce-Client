import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import laptop from '../../image/laptop.jpg'
import { Link } from 'react-router-dom';

const SideDrawer = ({children}) => {

    const {drawer,cart}=useSelector((state)=>({...state}))
    const dispatch=useDispatch();
    
     const onClose=()=>{
     dispatch({
         type:"SET_VISIBLE",
         payload:false
     })
    }
    const imageWidth={
        width:'100%',
        height:'70px',
        objectFit:'cover'
    }
    return (
        <div>
           <Drawer 
           className='text-center'
           title={`Cart/${cart.length} Product`} 
           placement="right" 
           onClose={onClose} 
           visible={drawer}>
             {
              cart.map((p)=>(
                <div className='row'>
                    <div className='col'>
                      {
                          p.images?<>
                             <img src={p.images[0].url} style={imageWidth}/>
                             <p className='text-center bg-secondary text-light'>
                                 {p.title}x{p.count}
                             </p>
                          </>:<>
                          <img src={laptop} className={imageWidth}/>
                            <p className='text-center bg-secondary text-light'>
                                 {p.title}x{p.count}
                            </p>
                          </>
                      }
                    </div>
                </div>
              ))
            }
           <Link to='/cart'>
           <button 
           onClick={()=>
            dispatch({
                type:"SET_VISIBLE",
                payload:false
             })  
           }
           className='text-center btn btn-primary'>
                Proceed To Cart
            </button>
           </Link>
         </Drawer> 
       </div>
    );
};

export default SideDrawer;