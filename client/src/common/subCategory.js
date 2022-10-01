import axios from 'axios';

export const getSubCategories= async()=>{
  return await axios.get(
   `${process.env.REACT_APP_API}/subs`
  	)
}

export const getSubCategorie= async(slug)=>{
    return await axios.get(
   `${process.env.REACT_APP_API}/sub/${slug}`
  	)
}

export const createSubCategory= async(sub,authtoken)=>{
return await axios.post(
   `${process.env.REACT_APP_API}/sub`,
    sub,
    {
    	headers:{
    		authtoken
    	    }
       }
  	)
}

export const updateSubCategory= async(slug,sub,authtoken)=>{
	return await axios.put(
   `${process.env.REACT_APP_API}/sub/${slug}`,
      sub,
      {
      	headers:{
      		authtoken
         	}
       }
  	)
}

export const deleteSubCatgory= async(slug,authtoken)=>{
   return await axios.delete(
   `${process.env.REACT_APP_API}/sub/${slug}`,{
      headers:{
      	authtoken
       }
   })
}




