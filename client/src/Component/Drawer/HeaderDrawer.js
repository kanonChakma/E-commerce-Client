import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip
} from "@mui/material";
import { Badge } from 'antd';
import { useState } from "react";
import { Link } from "react-router-dom";
import Search from '../Form/Search';
const paths=[
    {
        icon:<InboxIcon />,
        text:"About us"
    },
    {
        icon:<InboxIcon />,
        text:'NDIS'
    },
    {
        icon:<InboxIcon />,
        text:"Covid 19"
    },
    {
        icon:<InboxIcon />,
        text:'Serivices'
    },
    {
        icon:<InboxIcon />,
        text:'Career'
    },
]
const pages=["about","ndis","covid","service","career"];
const HeaderDrawer = ({user,logout, cart, category}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] =  useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{p:"10px"}}>
          <Search/>
        </Box>
       <Box   sx={{height:'100vh',width:'300px'}}>
       <List>
            <Link style={{ color: '#616161' }} to={`/user/wishlist`}>
            <ListItemButton onClick={() => setOpenDrawer(false)}>
                <ListItemIcon>
                  <FavoriteBorderIcon/>
                </ListItemIcon>
                <ListItemText>wishlist</ListItemText>
            </ListItemButton>
          </Link>
          {category.map((c, index) => (
          <Link style={{ color: '#616161' }} to={`/category/${c.slug}`}  key={index}>
            <ListItemButton onClick={() => setOpenDrawer(false)}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText>{c.name}</ListItemText>
            </ListItemButton>
          </Link>
          ))}
        </List>
       </Box>
      </Drawer>
      
      <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon  />
         </IconButton >
         
         <Button color="violet">
           <Link  style={{ color: '#616161' }}  to="/"> Home </Link>
         </Button>
         
         <Button>
          <Link  style={{ color: '#616161' }}  to="/shop"> Shop </Link>
         </Button>
       
       <Button>
         <Link style={{ color: '#616161' }} to="/cart">
           Cart 
          <Badge count={cart.length} offset={[0,-10]}>
         </Badge>
         </Link>
       </Button>

        <div style={{flexGrow: "1"}}></div>

       <Tooltip title="Account settings">
           <IconButton
           onClick={handleClick}
        >
        <AccountCircleIcon />
           </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!user && <MenuItem>
            <Avatar/> <Link to="/login">Login Account</Link>
        </MenuItem>}

       {!user && <MenuItem>
        <Avatar /> <Link to='/register'>Register Account</Link>
        </MenuItem>}

      {user && user.role ==="user" && <MenuItem>
          <Avatar/> <Link to="/user/history">My Account</Link>
      </MenuItem>}
      
      {user && user.role ==="admin" && <MenuItem>
      <Avatar/> <Link to="/user/history">My Account</Link>
       </MenuItem>}
       
      {user && user.role ==="admin" && <MenuItem>
      <Avatar/> <Link to="/admin/dashboard">Dashboard</Link>
      </MenuItem>}

      {user && <MenuItem
        onClick={logout}
        >
         <Avatar /> <Link>Logout</Link>
      </MenuItem>}
      
      </Menu>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default HeaderDrawer;
