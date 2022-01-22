import React from 'react';

const OrderSummary = ({cart}) => {
    const getTotal=()=>{
        return cart.reduce((f,s)=>{
           return f+s.count*s.price;
        },0)
       }
    return (
        <table class="table">
            <thead className='thead-light'>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Color</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                    <th scope="col">Count</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
               </tr>
         </thead>
              {
                 cart.map((p)=>(
                     <tbody key={p._id}> 
                        <tr>
                            <td>{p.title}</td>
                            <td>{p.color}</td>
                            <td>${p.price}</td>
                            <td>x</td>
                            <td>{p.count}</td>
                            <td>=</td>
                            <td>${p.price*p.count}</td>
                        </tr> 
                     </tbody>  
                    ))
                 }
             <tbody>
                <tr>
                    <td>Total Price</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>=</td>
                    <td>${getTotal()}</td>
                </tr>
              </tbody>
        </table> 
    );
};

export default OrderSummary;