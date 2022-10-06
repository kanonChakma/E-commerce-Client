import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import img from "../../image/first.jpg";

const useStyles = makeStyles(theme => ({
    card: {
      cursor:"pointer",
      maxWidth: 300,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    media: {
      paddingTop: "56.25%",
      height:"50%"
    },
    content: {
       height:"20px",
       textAlign: "center",
       padding: theme.spacing.unit * 3
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
  }));

const ShopCard = ({product}) => {
    const classes = useStyles();
    const history = useHistory();
    
    const{title,images,slug,price}=product;
    return (
        <Card className={`${classes.card} showicon`} onClick={() => history.push(`/product/${slug}`)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={images&&images.length?images[0].url:img }
        />
        <CardContent style={{height: "50px"}}>
          <Typography gutterBottom variant="body2" component="div">
            {title}
          </Typography>
        </CardContent>
        
        <CardActions sx={{justifyContent:"space-between"}}>
          <IconButton aria-label="view">
            <Typography gutterBottom variant="caption" >
            Tk.{price}
            </Typography>
          </IconButton>
          
          <IconButton  aria-label="view">
                <VisibilityIcon className='edit_hover_class' fontSize='small'/> 
           </IconButton>
        </CardActions>
      </Card>
    );
};

export default ShopCard;

// <Card className={classes.card}>
// <CardMedia
//   className={classes.media}
//   image={images&&images.length?images[0].url:img }
// />
// <CardContent className={classes.content}>
//   <Typography
//     className={"MuiTypography--heading"}
//     variant={"body2"}
//     gutterBottom
//   >
//    {title}
//   </Typography>
//   <Divider className={classes.divider} light />
// </CardContent>
// </Card>




