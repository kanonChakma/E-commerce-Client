import React from 'react'

const CreateProductForm=({handleSubmit,name,setName}) =>{
    return (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input 
            type="text"
            onChange={(e) => setName(e.target.value)} 
            className="form-control"
            placeholder="Enter the product name"
            value={name}
            autoFocus
            required             
            />
            <button  className="btn btn-outline-secondary">update</button>
        </div>
    </form>
    )
}
export default  CreateProductForm;
