import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    height: "100%"
  },
  avatar: { 
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: "black"
  }
}));

const listItems = [
  {
    listIcon: <DashboardOutlinedIcon />,
    listText: "Dashboard",
    path:"/admin/dashboard"
  },
  {
    listIcon: <ProductionQuantityLimitsOutlinedIcon />,
    listText: "Product",
    path:"/admin/product"
  },
  {
    listIcon: <ShoppingBagOutlinedIcon />,
    listText: "Products",
    path:"/admin/products" 
  },
  {
    listIcon: <CategoryOutlinedIcon />,
    listText: "Category",
    path:"/admin/category"
  },
  {
    listIcon: <LanOutlinedIcon />,
    listText: "SubCategory",
    path:"/admin/sub"
  },
  {
    listIcon: <Inventory2OutlinedIcon />,
    listText: "Coupon",
    path:"/admin/coupon"
  }
];

const AdminNav = () => {
  const classes = useStyles();
  return (
    <Box className={classes.menuSliderContainer} component="div">
    <List>
      {listItems.map((listItem, index) => (
        <Link style={{ color: 'black' }} to={listItem.path}>
        <ListItem className={classes.listItem} button key={index}>
          <ListItemIcon className={classes.listItem}>
            {listItem.listIcon}
          </ListItemIcon>
          
            <ListItemText primary={listItem.listText} />
        </ListItem>
        </Link>
      ))}
    </List>
  </Box>
  )
}

export default AdminNav;
