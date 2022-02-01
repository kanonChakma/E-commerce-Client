import axios from "axios";

export const CreateCart=async(cart,authtoken)=>{
    return await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
         {cart},
        {
          headers:{
              authtoken
            }
         }
      )
  }
  export const getCart=async(authtoken)=>{
    return await axios.get(
        `${process.env.REACT_APP_API}/user/cart`,
        {
          headers:{
              authtoken
            }
         }
      )
  }
  export const removeCart=async(authtoken)=>{
    return await axios.delete(
        `${process.env.REACT_APP_API}/user/cart`,
        {
          headers:{
              authtoken
            }
         }
      )
  }
  
  export const saveAddress=async(authtoken,address)=>{
    return await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        {address},
        {
          headers:{
              authtoken
            }
         }
      )
  }
  
  export const createOrder=async(paymentIntent,authtoken)=>{
    return await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        {paymentIntent},
        {
          headers:{
              authtoken
            }
         }
      )
  }