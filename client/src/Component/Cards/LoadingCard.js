import { Card, Skeleton } from 'antd';
import React from 'react';

const LoadingCard = ({count}) => {
    let totalCards=[];
    console.log({count})
    const cards=()=>{
        for (let i = 0; i < count; i++) {
           totalCards.push(
             <Card className='col-md-4 m-3'>
               <Skeleton active/>
             </Card>  
           ) 
        }
        return totalCards; 
    } 
    return (
        <div className='row pb-5 my-3' >
            {
              cards() 
            }
        </div>
    );
};
export default LoadingCard;