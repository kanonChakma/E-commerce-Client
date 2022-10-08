import { DashboardOutlined, HeartOutlined, HomeOutlined, LoginOutlined, SettingOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import { Badge, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCategories } from '../../common/category';
import { getSubCategories } from '../../common/subCategory';
import "../../css/header.css";
import HeaderDrawer from '../Drawer/HeaderDrawer';
import Search from '../Form/Search';

const  { SubMenu,Item,ItemGroup } = Menu;

const Header = () => {
    const [currentState,setCurrentState]=useState('home');
    const[category,setCategory]=useState([]);
    const[subs,setSubs]=useState([]);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    
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
      <>
      {
        isMatch?(<HeaderDrawer user={user} cart={cart} logout={logout} />):(
          <Menu style={{fontSize:'17px', padding:"7px 15px"}} onClick={handleClick} selectedKeys={[currentState]} mode="horizontal">
          <Item key="home" icon={<HomeOutlined style={{ fontSize: '14px' }}/>}>
            <Link to="/">Home</Link>
          </Item>

           <SubMenu icon={<SettingOutlined style={{ fontSize: '14px' }}/>} title="Category">
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
           
          <Item key="shop" icon={<ShopOutlined style={{ fontSize: '14px' }}/>}>
            <Link to="/shop">Shop</Link>
          </Item>
            
          <Item key="cart" icon={<ShoppingCartOutlined style={{ fontSize: '14px' }}/>}>
            <Link to="/cart">
               Cart
              <Badge count={cart.length} offset={[0,-10]}>
              </Badge>
            </Link>
          </Item>
           <Item key="whislist" icon={<HeartOutlined style={{ fontSize: '14px' }}/>}>
            <Link to="/user/wishlist">wishlist</Link>
          </Item>
        {!user && <Item key="register" icon={<HomeOutlined />}  className="float-right">
            <Link to="/register">Register</Link>
        </Item>}

        {!user && <Item key="login" icon={<LoginOutlined />} className="float-right">
             <Link to="/login">Login</Link>
         </Item>}

        {user && (
        <SubMenu 
          key="username" 
          icon={<UserOutlined />} 
          title={user && user.email.split('@')[0]} 
          className="float-right">
          
        {user && user.role==='subscriber' &&  <Item icon={<DashboardOutlined />}><Link to="/user/history">Dashboard</Link></Item>}
        {user && user.role==='admin' &&   <Item icon={<DashboardOutlined />}><Link to="/admin/dashboard">Dashboard</Link></Item>}
        <Item icon={<LoginOutlined />} onClick={logout}>Log Out</Item>
         
         </SubMenu>
         )}
        <span className='float-right p-1'>
            <Search/>
           </span>
        </Menu>
        )
      }
      </>
    );
};

export default Header;