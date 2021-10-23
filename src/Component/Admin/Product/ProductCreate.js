import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateProduct } from '../../../common/product';
import AdminNav from '../../nav/AdminNav';

const ProductCreate = () => {
    return (
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                 <AdminNav/>
               </div>
               <div className="col-md-10">
                  <h1>welcome this is product page</h1>
               </div>
            </div>
        </div>
    );
};
export default ProductCreate;