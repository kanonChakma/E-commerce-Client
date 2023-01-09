import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "../../css/header.css";


const Search = () => {
    const{search}=useSelector((state)=>({...state}))
    const {text}=search
    const dispatch=useDispatch()
    const history=useHistory()

    const handleSubmit=(e) => {
       e.preventDefault();
       history.push(`/shop?${text}`)
    }
    const handleChange = (e) => {
         dispatch ({
            type: "SEARCH_QUERY",
            payload:{text:e.target.value}
         })
    }
    
    return (
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "300px" }}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        onChange={handleChange}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={handleSubmit} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
      //  <form className='form-inline my-2 my-lg-0' 
      //    onSubmit={handleSubmit}>
      //        <input
      //        className='change'
      //        onChange={handleChange} 
      //        value={text}
      //        type='search' 
      //        placeholder='Search'/>
      //        <SearchOutlined onClick={handleSubmit} style={{cursor:"pointer",fontSize: '16px'}}/>             
      //  </form>
    );
};
export default Search;