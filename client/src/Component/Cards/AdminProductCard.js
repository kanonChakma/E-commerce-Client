import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
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

const AdminProductCard = ({product, handleRemove}) => {
    const classes = useStyles();
    
    const{title,images,slug}=product;
    return (
        <Card className={`${classes.card} showicon`}>
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
                <Link to={`/admin/product/${slug}`}>
                  <EditOutlinedIcon fontSize='small'/> 
                </Link> 
              </IconButton>
              
              <IconButton  aria-label="view">
                    <DeleteOutlineIcon fontSize='small' onClick={()=>handleRemove(slug)}/> 
              </IconButton>
          </CardActions>
      </Card>
    );
};

export default AdminProductCard;


// import React from 'react';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import img from '../../image/first.jpg';
// import { Card } from 'antd';
// import { Link } from 'react-router-dom';
// const { Meta } = Card;

// const AdminProductCard = ({product,handleRemove}) => {
//     const{title,description,images,slug}=product;
//     return (
//         <Card
//         hoverable
//         cover={
//             <div style={{ overflow: "hidden", height: "250px" }}>
//             <img
//               style={{ height: "100%" ,width:"100%",objectFit:"cover"}}
//               src={images&&images.length?images[0].url:img}
//             />
//            </div>
//           }
//           actions={[
//               <Link to={`/admin/product/${slug}`}>
//                   <EditOutlined key="edit" className="text-danger" />
//               </Link>,
//              <DeleteOutlined onClick={()=>handleRemove(slug)} className="text-danger"/>
//           ]}
//         >
//         <Meta 
//          title={title}
//          description={`${description && description.substring(0,40)}...`} />
//       </Card>
//     );
// };
// export default AdminProductCard;
