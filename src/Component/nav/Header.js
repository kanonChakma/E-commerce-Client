import React, { useState } from 'react';
import { LoginOutlined, UserOutlined,HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
const { SubMenu,Item } = Menu;

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

       {!user && <Item key="register" icon={<HomeOutlined />}  className="float-right">
            <Link to="/register">Register</Link>
        </Item>}

        {!user && <Item key="login" icon={<HomeOutlined />} className="float-right">
             <Link to="/login">Login</Link>
        </Item>}

       {user && <SubMenu key="username" icon={<UserOutlined />} title={user && user.email.split('@')[0]} className="float-right">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LoginOutlined />} onClick={logout}>Log Out</Item>
        </SubMenu>}

      </Menu>
    );
};

export default Header;