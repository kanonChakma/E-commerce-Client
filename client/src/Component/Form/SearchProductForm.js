import React from 'react';

const SearchProductForm=({keyword,setKeyword, place}) =>{
    const handleSearchChange=(e)=>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <div>
             <input 
             type="search"
             value={keyword}
             className="form-control mb-4"
              onChange={handleSearchChange}
              placeholder={place}
              />  
        </div>
    )
}
export default  SearchProductForm;