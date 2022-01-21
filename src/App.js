import React, { useEffect } from 'react';
import {Switch,Router, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Component/nav/Header';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

import {useDispatch} from 'react-redux';
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './common/authData';
import History from './Component/User/History';
import Password from './Component/User/Password';
import WishList from './Component/User/WishList';
import UserRoute from './Component/PrivateRoute/UserRoute';
import AdminRoute from './Component/PrivateRoute/AdminRoute';
import AdminDashboard from './Component/Admin/AdminDashboard';
import CreateProduct from './Component/Admin/Category/createProduct';
import UpdateProduct from './Component/Admin/Category/UpdateProduct'
import SubCreate from  './Component/Admin/subCategory/SubCreate'
import SubUpdate from './Component/Admin/subCategory/SubUpdate';
import ProductCreate from './Component/Admin/Product/ProductCreate';
import AllProducts from './Component/Admin/Product/AllProducts';
import ProductUpdate from './Component/Admin/Product/ProductUpdate';
import ProductInfo from './pages/ProductInfo';
import AllCategory from './pages/category/AllCategory';
import AllSubsCategory from './pages/subCategory/AllSubsCategory'
import Shop from './pages/Shop';
import Cart from '../src/Component/Cart/Cart';

const App=()=> {
   const dispatch=useDispatch();

   //to checkfirebase auth state
   useEffect(()=>{
     const unsubscribe=auth.onAuthStateChanged( async (user)=>{
         if(user){
              const  idTokenResult=await user.getIdTokenResult();
              currentUser(idTokenResult.token)
              .then((res)=>{
                dispatch({
                  type:'USER_LOGGED_IN',
                  payload:{
                    name:res.data.name,
                    email:res.data.email,
                    role:res.data.role,
                    token:idTokenResult.token,
                    _id:res.data._id
                  }
                })
              })
              .catch((err)=>console.log(err));
           }
       });
   },[])
  return (
  <>
   <Header/>
   <ToastContainer/>
   <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login"    component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/complete" component={CompleteRegistration}/>
      <Route exact path="/forgot/password"   component={ForgotPassword}/>
      <UserRoute exact path="/user/history"   component={History}/>
      <UserRoute exact path="/user/password"  component={Password}/>
      <UserRoute exact path="/user/wishlist"     component={WishList}/>
      <AdminRoute exact path="/admin/dashboard"  component={AdminDashboard}/>
     
      <AdminRoute exact path="/admin/category"         component={CreateProduct}/>
      <AdminRoute exact path="/admin/category/:slug"   component={UpdateProduct}/>
     
      <AdminRoute exact path="/admin/sub"        component={SubCreate}/>
      <AdminRoute exact path="/admin/sub/:slug"  component={SubUpdate}/>

      <AdminRoute exact path="/admin/product"  component={ProductCreate}/>
      <AdminRoute exact path="/admin/products" component={AllProducts}/>
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>

      <Route exact path="/product/:slug"  component={ProductInfo}/>
      <Route exact path="/category/:slug" component={AllCategory}/>

      <Route exact path="/sub/:slug" component={AllSubsCategory}/>
      <Route exact path="/shop" component={Shop}/>
      <Route exact path="/cart" component={Cart}/>
     </Switch>
   </>
  );
}
export default App;

