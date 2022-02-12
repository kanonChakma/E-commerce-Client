import React, { useEffect, useState } from 'react';
import {HeartOutlined,SettingOutlined,LoginOutlined,ShoppingCartOutlined,ShopOutlined,UserOutlined,HomeOutlined,DashboardOutlined } from '@ant-design/icons';
import { Menu,Badge } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getCategories } from '../../common/category';
import { getSubCategories } from '../../common/subCategory';
import "../../css/header.css";

import Search from '../Form/Search';
const  { SubMenu,Item,ItemGroup } = Menu;

const Header = () => {
    const [currentState,setCurrentState]=useState('home');
    const[category,setCategory]=useState([]);
    const[subs,setSubs]=useState([]);
    
    useEffect(()=>{
      AllCategory()
      allSubs()
  },[])

  const AllCategory=()=>{
    getCategories()
    .then((res)=>{
        setCategory(res.data)
    })
  }

  const allSubs=()=>{
    getSubCategories()
    .then((res)=>{
        setSubs(res.data)
    })
  }
    const dispatch =useDispatch();
    const history = useHistory();
    const {user,cart}=useSelector((state) =>({...state}));
     
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
        <Menu style={{fontSize:'16px',height:'80px'}} onClick={handleClick} selectedKeys={[currentState]} mode="horizontal">
          <Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Item>

          <Item key="shop" icon={<ShopOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>

          <Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">
              <Badge count={cart.length} offset={[9,0]}>
                
                  Cart
              </Badge>
            </Link>
          </Item>
           <SubMenu icon={<SettingOutlined />} title="Category">
              <ItemGroup>
                {
                category.map((c)=>(
                    <Item key="category">
                      <Link to={`/category/${c.slug}`}>
                          {c.name}
                      </Link>
                     </Item>
                     ))
                  }
              </ItemGroup>
           </SubMenu>
           <Item key="whislist" icon={<HeartOutlined />}>
            <Link to="/user/wishlist">whislist</Link>
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