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
          address,
        {
          headers:{
              authtoken
            }
         }
      )
  }
  
  export const createOrder=async(address,paymentIntent,authtoken)=>{
    return await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        {address,paymentIntent},
        {
          headers:{
              authtoken
            }
         }
      )
  }
  
  export const getOrder=async(authtoken)=>{
    return await axios.get(
        `${process.env.REACT_APP_API}/user/order`,
        {
          headers:{
              authtoken
            }
         }
      )
  }

  export const getUserWishList=async(authtoken)=>{
    return await axios.get(
        `${process.env.REACT_APP_API}/user/wishList`,
        {
          headers:{
              authtoken
            }
         }
      )
  }
  export const createUserWishList=async(productId,authtoken)=>{
    return await axios.post(
        `${process.env.REACT_APP_API}/user/wishList`,
        {productId},
        {
          headers:{
              authtoken
            }
         }
      )
  }

  export const updateUserWishList=async(productId,authtoken)=>{
    return await axios.put(
        `${process.env.REACT_APP_API}/user/whisList/${productId}`,
        {},
        {
          headers:{
              authtoken
            }
         }
      )
}
export const createCashPayment=async(coupon,cashOn,address,authtoken)=>{
  return await axios.post(
      `${process.env.REACT_APP_API}/user/cash-payment`,
      {coupon,cashOn,address},
      {
        headers:{
            authtoken
          }
       }
    )
}