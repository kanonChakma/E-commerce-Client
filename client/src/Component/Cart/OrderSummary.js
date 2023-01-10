import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCashPayment, getCart, removeCart } from '../../common/user';

const OrderSummary = ({setTotalPrice,prevStep,nextStep,totalPrice}) => {
    const{user,cashOn}=useSelector((state)=>({...state}))
    const[cart,setCart]=useState([]);
    const history=useHistory()
    const dispatch=useDispatch();
    const[saveAdd,setSaveAdd]=useState(true);
   

    useEffect(()=>{
       getCart(user.token)
       .then((res)=>setCart(res.data.products))
       .catch((err)=>console.log(err));
    },[])

     const back = e => {
        e.preventDefault();
         prevStep();
      };
    const handleEmpty=()=>{
        if(typeof window!== "undefined"){
           localStorage.removeItem("cart") 
        }
        dispatch({
            type:"ADD_TO_CART",
            payload:[]
        })
        removeCart(user.token)
        .then((res)=>{
          setCart([])
          setTotalPrice(0)
          toast.success("Cart is deleted.Continue Shopping...")
        })
    }

    const handleCash=()=>{
        createCashPayment(cashOn,user.token)
        .then((res)=>{
            ///--
        })
    }

    const getTotal=()=>{
        return cart.reduce((f,s)=>{
           return f+s.count*s.price;
        },0)
       }

     const handleTable=()=>(
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
     )  
     const showTotal=()=>(
        <table class="table">
        <thead className='thead-light'>
     </thead>
         <tbody>
            <tr className="table-dark">
                <td></td>
                <td></td>
                <td>Total After Discount:</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>=</td>
                <td>${totalPrice}</td>
            </tr>
          </tbody>
    </table>
     )
    return (
        <Container maxWidth="sm">
          <div style={{minHeight:"70vh"}}>
            <div className='row'>
              <div className='col-md-12  mt-5 pt-3'>
              <h4 className='text-center bg-secondary p-2 mb-5'>Order Summary</h4> 
                {handleTable()}
                {totalPrice>0 && showTotal()}
                 <div 
                className='row mt-5'
                style={{
                   display:"flex",
                   justifyContent:"space-evenly"
                }}
                >
                   <div className='col-xs-4'>
                       <button   onClick={back}  type="button" class="btn btn-outline-success">Back</button>
                       </div>
                    <div className='col-xs-4'>
                       <button 
                           onClick={()=>history.push("/select-payment")} 
                           disabled={!saveAdd || !cart.length} 
                           className='btn btn-outline-primary'>
                           PLACE ORDER
                       </button>
                    </div>
                    <div className='col-xs-4'>
                        <button disabled={!cart.length}  onClick={handleEmpty} className='btn btn-outline-warning'>
                           EMPTY CART
                        </button>
                      </div>
                 </div>
              </div>
            </div>
           </div> 
        </Container>
    );
};

export default OrderSummary;