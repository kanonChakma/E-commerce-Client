import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const Address = ({data,nextStep,handleChange}) => {
    const{address}=useSelector((state)=>({...state}))
    const dispatch=useDispatch();
    const { firstName, lastName, email, phone, address1, address2,information } = data;


    const handleSaveAdress=(e)=>{
      e.preventDefault();
       dispatch({
        type:"ADD_ADDRESS",
        payload:data
      })
        toast.success("address saved")
        nextStep()
      }
      //   saveAddress(user.token,data)
      //   .then((res)=>{
      //       if(res.data.ok) 
      //       setAdress('') 
      //       setSaveAdd(true)
      //      })
      //   .catch((err)=>toast.error("error are exis"));
      // 

    return (
      <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3  mt-5 pt-5'>
                  <h4 className='text-center  p-3 mb-3'>Add Address</h4>
                <form onSubmit={handleSaveAdress} className='bg-secondary text-light p-3'>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <input reuired type="text" onChange={handleChange} name="firstName" value={firstName} className="form-control" />
                        <label>First name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <input type="text" onChange={handleChange} name="lastName" value={lastName}  className="form-control" />
                        <label >Last name</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" onChange={handleChange} required name="address1" value={address1}  className="form-control" />
                    <label >Address 1</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" onChange={handleChange} name="address2" value={address2 }  className="form-control" />
                    <label >Address 2</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" onChange={handleChange} required name="email" value={email} className="form-control" />
                    <label  >Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="number" onChange={handleChange}  required name="phone" value={phone}  className="form-control" />
                    <label  >Phone</label>
                  </div>

                  <div className="form-outline mb-4">
                    <textarea className="form-control" onChange={handleChange}  name="information" value={information}  rows="3"></textarea>
                    <label >Additional information</label>
                  </div>
                  <button  className="bg-dark  text-dark btn btn-primary btn-block mb-4">Save Address</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Address;