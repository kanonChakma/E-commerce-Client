import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const FooterColumn=(props)=>{    
    return(
        <Grid
         sx={{marginBottom:{xs:"10px",sm:"1px"}}}
         item xs={6}  sm={3} md={2} >
            <p className="text-primary">{props.menuTitle?props.menuTitle:""}</p>
            <ul className="list-unstyled">
                {
                 props.menuItem.map((item,index)=>
                 <li key={index}>
                     <Link className="text-secondary" to={item.link}>{item.name}</Link>
                 </li>
                 )
                }
            </ul>
            {props.children && props.children}
        </Grid>
    );
};
export default FooterColumn;