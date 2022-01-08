import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { Button} from 'antd';
import {MailOutlined,GoogleOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdate } from '../../common/authData';

const Login = ({history}) => {
    const dispatch=useDispatch();
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [loading,setLoading] = useState(false);
    
    //will not working lession->25
    const {user}=useSelector((state)=>({...state}))
    useEffect(()=>{
        let exist=history.location.state;
        if(exist){
            return;
        }else{
            if(user && user.token) history.push("/");  
        }
    },[user, history])

    const authorization= (res) => {

        let exist=history.location.state;
        //console.log(exist);
         if(exist){
              history.push(exist.from);
         }else{
            if(res.data.role === 'admin'){
                history.push("/admin/dashboard");    
               }else{
                   history.push("/user/history");
               }
         }
      }
    const googleLogIn=()=>{
           auth.signInWithPopup(googleAuthProvider)
           .then(async (result)=>{
             const {user} = result;
             const idTokenResult= await user.getIdTokenResult();
             createOrUpdate(idTokenResult.token)
            .then((res)=>{
                dispatch({
                    type: 'USER_LOGGED_IN',
                    payload: {
                        name:res.data.name,
                        email:res.data.email,
                        role:res.data.role,
                        token: idTokenResult.token,
                        _id:res.data._id
                    }
                })
                authorization(res);
            })
            .catch((err)=>console.log(err))
           })
           .catch((error)=>{
               toast.error(error.message);
           })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       try{
        const result=await auth.signInWithEmailAndPassword(email, password);
        const {user} = result;
        const idTokenResult=await user.getIdTokenResult();
        createOrUpdate(idTokenResult.token)
        .then((res)=>{
            dispatch({
                type: 'USER_LOGGED_IN',
                payload: {
                    name:res.data.name,
                    email:res.data.email,
                    role:res.data.role,
                    token: idTokenResult.token,
                    _id:res.data._id
                 }
              })
              authorization(res);
          })
        .catch((err)=>console.log(err))  
       }catch(e){
           setLoading(false);
           toast.error(e.message);
       }
    }
    const LoginForm = () =>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                type="email" 
                placeholder="Enter Your Email"
                className="form-control" 
                onChange={e=>setEmail(e.target.value)}
                value={email}
                autoFocus
                />
            </div>
            <div className="form-group">
                <input 
                type="password" 
                placeholder="Enter Your Password"
                className="form-control" 
                onChange={e=>setPassword(e.target.value)}
                value={password}
                autoFocus
                />
            </div>
           <Button 
           onClick={handleSubmit}
            type="primary"
            icon={<MailOutlined />} 
            size="large"
            block
            className="mb-3"
            shape="round"
            disabled={!email || password.length<6}
            >
               Login with Email
           </Button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                     {loading?<h4 className="text-danger">Loading...</h4>:<h4>Login</h4>}
                     {LoginForm()}
                     <Button 
                      onClick={googleLogIn}
                        type="danger"
                        icon={<GoogleOutlined />} 
                        size="large"
                        block
                        className="mb-3"
                        shape="round"
                        >
                        Login with Google
                    </Button>
                    <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;