import React from 'react';

const CreateProductForm=({handleSubmit,name,setName}) =>{
    return (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input 
            type="text"
            onChange={(e) => setName(e.target.value)} 
            className="form-control mt-2"
            placeholder="Enter the category name"
            value={name}
            autoFocus
            required             
            />
            <button  className="btn btn-outline-secondary my-3">create</button>
        </div>
    </form>
    )
}
export default  CreateProductForm;
