import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCard = ({count}) => {
    let totalCards=[];

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
        <div className='row pb-5'>
            {
              cards() 
            }
        </div>
    );
};
export default LoadingCard;