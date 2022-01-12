import React from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { SearchOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const{search}=useSelector((state)=>({...state}))
    const {text}=search
    const dispatch=useDispatch()
    const history=useHistory()

    const handleSubmit=(e)=>{
       e.preventDefault();
       history.push(`/shop?${text}`)
    }
    const handleChange=(e)=>{
         dispatch({
            type: "SEARCH_QUERY",
            payload:{text:e.target.value}
         })
    }
    return (
       <form className='form-inline my-2 my-lg-0' 
       onSubmit={handleSubmit}>
             <input
             onChange={handleChange} 
             type='search' 
             clasName='form-control mr-sm-2' 
             placeholder='Search'/>
             <SearchOutlined onClick={handleSubmit} style={{cursor:"pointer",fontSize: '16px'}}/>             
       </form>
    );
};
export default Search;