import { LoadingOutlined } from '@ant-design/icons';
import { ThemeProvider } from '@mui/material';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from './common/authData';
import Footer from './Component/Footer/Footer';
import { appTheme } from './css/theme';
import { auth } from './firebase';



// import SideDrawer from './Component/Drawer/SideDrawer';
// import Header from './Component/nav/Header';
// import CompleteRegistration from './pages/auth/CompleteRegistration';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Home from './pages/Home';

// import {useDispatch} from 'react-redux';
// import { auth } from './firebase';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import { currentUser } from './common/authData';
// import History from './Component/User/History';
// import Password from './Component/User/Password';
// import WishList from './Component/User/WishList';
// import UserRoute from './Component/PrivateRoute/UserRoute';
// import AdminRoute from './Component/PrivateRoute/AdminRoute';
// import AdminDashboard from './Component/Admin/AdminDashboard';
// import CreateProduct from './Component/Admin/Category/createProduct';
// import UpdateProduct from './Component/Admin/Category/UpdateProduct'
// import SubCreate from  './Component/Admin/subCategory/SubCreate'
// import SubUpdate from './Component/Admin/subCategory/SubUpdate';
// import ProductCreate from './Component/Admin/Product/ProductCreate';
// import AllProducts from './Component/Admin/Product/AllProducts';
// import ProductUpdate from './Component/Admin/Product/ProductUpdate';
// import ProductInfo from './pages/ProductInfo';
// import AllCategory from './pages/category/AllCategory';
// import AllSubsCategory from './pages/subCategory/AllSubsCategory'
// import Shop from './pages/Shop';
// import Cart from '../src/Component/Cart/Cart';
// import Checkout from './Component/Cart/Checkout';
// import CreateCoupon from './Component/Admin/Coupon/CreateCoupon';
// import Payment from './Component/Cart/Payment';
// import SelectPaymentMethod from './Component/Cart/SelectPaymentMethod';
// import CashPayment from './Component/Cart/CashPayment';

const NotFoundPages=lazy(()=>import('./pages/NotFoundPages'));
const SideDrawer=lazy(()=>import('./Component/Drawer/SideDrawer'))
const Header=lazy(()=>import('./Component/Nav/Header'))
const CompleteRegistration=lazy(()=>import('./pages/auth/CompleteRegistration'))
const Login=lazy(()=>import('./pages/auth/Login'))
const Register=lazy(()=>import('./pages/auth/Register'))
const Home=lazy(()=>import('./pages/Home'))

const ForgotPassword = lazy(()=>import('./pages/auth/ForgotPassword'))
const History = lazy(()=>import('./Component/User/History'))
const Password = lazy(()=>import('./Component/User/Password'))
const WishList = lazy(()=>import('./Component/User/WishList'))
const UserRoute = lazy(()=>import('./Component/PrivateRoute/UserRoute'))
const AdminRoute = lazy(()=>import('./Component/PrivateRoute/AdminRoute'))
const AdminDashboard = lazy(()=>import('./Component/Admin/AdminDashboard'))
const CreateProduct = lazy(()=>import('./Component/Admin/Category/createProduct'))
const UpdateProduct = lazy(()=>import('./Component/Admin/Category/UpdateProduct'))
const SubCreate = lazy(()=>import('./Component/Admin/subCategory/SubCreate'))
const SubUpdate = lazy(()=>import('./Component/Admin/subCategory/SubUpdate'))
const ProductCreate = lazy(()=>import('./Component/Admin/Product/ProductCreate'))
const AllProducts = lazy(()=>import('./Component/Admin/Product/AllProducts'))
const ProductUpdate = lazy(()=>import('./Component/Admin/Product/ProductUpdate'))
const ProductInfo = lazy(()=>import('./pages/ProductInfo'))
const AllCategory = lazy(()=>import('./pages/category/AllCategory'))
const AllSubsCategory = lazy(()=>import('./pages/subCategory/AllSubsCategory'))
const Shop = lazy(()=>import('./pages/Shop'))
const Cart = lazy(()=>import('../src/Component/Cart/Cart'))
const Checkout = lazy(()=>import('./Component/Cart/Checkout'))
const CreateCoupon = lazy(()=>import('./Component/Admin/Coupon/CreateCoupon'))
const Payment = lazy(()=>import('./Component/Cart/Payment'))
const SelectPaymentMethod = lazy(()=>import('./Component/Cart/SelectPaymentMethod'))
const CashPayment = lazy(()=>import('./Component/Cart/CashPayment'))
const Succesfull = lazy(() => import('./Component/Cart/Succesfull'))

const App=()=> {
  const dispatch=useDispatch();

  //to checkfirebase auth state
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged( async (user) => {
        
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
    <ThemeProvider theme={appTheme}>
    <Suspense fallback={
      <div className='col text-center p-5 mt-5'>
         React-Redux _<LoadingOutlined />_Ecommerce
      </div>
    }>
     <Header/>
     <SideDrawer/>
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
      
        <AdminRoute exact path="/admin/coupon"  component={CreateCoupon}/>
  
        <Route exact path="/product/:slug"  component={ProductInfo}/>
        <Route exact path="/category/:slug" component={AllCategory}/>
  
        <Route exact path="/sub/:slug" component={AllSubsCategory}/>
        <Route exact path="/shop" component={Shop}/>
        <Route exact path="/cart" component={Cart}/>
        
        <UserRoute exact path="/checkout"  component={Checkout}/>
        <UserRoute exact path="/payment"  component={Payment}/>
        <UserRoute exact path="/payment/successfull"  component={Succesfull}/>
        <UserRoute exact path="/select-payment"  component={SelectPaymentMethod}/>
        <UserRoute exact path="/cash-payment"  component={CashPayment}/>
        <Route exact path="*" component={NotFoundPages} />
       </Switch>
       <Footer/>
     </Suspense>
    </ThemeProvider>
  )
}
export default App;

