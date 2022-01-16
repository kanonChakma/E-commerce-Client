import React, { useState } from 'react';
import { LoginOutlined, ShopOutlined,UserOutlined,HomeOutlined,DashboardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Search from '../Form/Search';
const  { SubMenu,Item } = Menu;

const Header = () => {
    const [currentState,setCurrentState]=useState('home');
    const dispatch =useDispatch();
    const history = useHistory();
    const {user}=useSelector((state) =>({...state}));
     
    const handleClick=(e)=>{
       setCurrentState(e.key);
    }
    const logout=()=>{
       dispatch({
         type: 'USER_LOGGED_OUT',
         payload:null,
       })
      history.push("/login"); 
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[currentState]} mode="horizontal">
          <Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Item>

          <Item key="shop" icon={<ShopOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>

        {!user && <Item key="register" icon={<HomeOutlined />}  className="float-right">
            <Link to="/register">Register</Link>
        </Item>}

        {!user && <Item key="login" icon={<HomeOutlined />} className="float-right">
             <Link to="/login">Login</Link>
         </Item>}

        {user && (
        <SubMenu 
        key="username" 
        icon={<UserOutlined />} 
        title={user && user.email.split('@')[0]} 
        className="float-right">
          
        {user && user.role==='subscriber' &&  <Item icon={<DashboardOutlined />}><Link to="/user/history">Dahboard</Link></Item>}
        {user && user.role==='admin' &&   <Item icon={<DashboardOutlined />}><Link to="/admin/dashboard">Dashboard</Link></Item>}
        <Item icon={<LoginOutlined />} onClick={logout}>Log Out</Item>
         
         </SubMenu>
         )}
        <span className='float-right p-1'>
            <Search/>
        </span>
      </Menu>
    );
};

export default Header;