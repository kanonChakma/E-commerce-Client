import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const ProductForm = ({values,handleChange,handleSubmit,hadleCategoryChange,subOption,showSub,setValues}) => {
    const {title,description,price,categories,category,subs,quantity,images,shipping,colors,brands,color,brand}=values;
    return (
            <form onSubmit={handleSubmit}>
                       <div className="form-group">
                            <label>Title</label>   
                            <input 
                            name="title" 
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={handleChange}
                            />
                       </div>

                       <div className="form-group">
                            <label>Description</label>   
                            <input 
                            name="description" 
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={handleChange}
                            />
                       </div>

                       <div className="form-group">
                            <label>Price</label>   
                            <input 
                            type="number"
                            name="price" 
                            className="form-control"
                            value={price}
                            onChange={handleChange}
                            />
                       </div>

                       <div className="form-group">
                            <label>Shipping</label>   
                            <select 
                            name="shipping" 
                            className="form-control"
                            onChange={handleChange}
                            >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                         </select>   
                       </div>

                       <div className="form-group">
                            <label>Quantity</label>   
                            <input 
                            type="number"
                            name="quantity" 
                            className="form-control"
                            value={quantity}
                            onChange={handleChange}
                            />
                       </div>

                       <div className="form-group">
                            <label>Colors</label>   
                            <select 
                            name="color" 
                            className="form-control"
                            onChange={handleChange}
                            >
                            <option>Please Select</option>
                            {colors.map((c)=><option key={c} value={c}>{c}</option>)}
                         </select>   
                       </div>

                       <div className="form-group">
                            <label>Brands</label>   
                            <select 
                            name="brand" 
                            className="form-control"
                            onChange={handleChange}
                            >
                            <option>Please Select</option>
                            {brands.map((c)=><option key={c} value={c}>{c}</option>)}
                         </select>   
                       </div>
                       
                       <div className="form-group">
                            <label>Category</label>   
                            <select 
                            name="category" 
                            className="form-control"
                            value={category}
                            onChange={hadleCategoryChange}
                            >
                            <option>Please Select</option>
                            {
                            categories.length>0 &&
                              categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)
                            }
                         </select>   
                       </div>
                       {showSub && <div>
                            <label>Sub categories</label>
                             <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                value={subs}
                                onChange={(value)=>setValues({...values,subs:value})}
                                >
                                 {
                                 subOption.length &&
                                    subOption.map((e)=>(<Option key={e._id} value={e._id}>{e.name}</Option>))
                                }
                            </Select>   
                        </div>}
                    <button className="btn btn-outline-info">Save</button>
            </form>
      );
};
export default ProductForm;