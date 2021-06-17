import axios from 'axios';

export const createOrUpdate= async(authToken)=>{
    return await axios.post(
       ` ${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
        headers:{
            authToken
         }
     }
  )
}

export const currentUser= async(authToken)=>{
    return await axios.post(
        ` ${process.env.REACT_APP_API}/current-user`,
        {},
        {
           headers:{
               authToken
           } 
         }
    )
}

