import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
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
    listIcon: <HistoryOutlinedIcon />,
    listText: "History",
    path:"/user/history"
  },
  {
    listIcon: <AddShoppingCartOutlinedIcon />,
    listText: "WishList",
    path:"/user/wishlist"
  },
  {
    listIcon: <PasswordOutlinedIcon />,
    listText: "Password",
    path:"/user/password" 
  },
];

const UserNav = () => {
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

export default UserNav;



