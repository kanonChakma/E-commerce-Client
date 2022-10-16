import React from 'react';

const CreateProductForm=({handleSubmit,name,setName, text, place}) =>{
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                type="text"
                onChange={(e) => setName(e.target.value)} 
                className="form-control mt-2"
                placeholder={place}
                value={name}
                autoFocus
                required             
                />
                <button  className="btn btn-outline-secondary my-3">{text}</button>
            </div>
    </form>
    )
}
export default  CreateProductForm;
