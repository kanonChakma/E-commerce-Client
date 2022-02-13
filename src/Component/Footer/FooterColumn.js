import React from 'react';
import { Link } from 'react-router-dom';
const FooterColumn=(props)=>{
    
    return(
        <div className="col-md-3">
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
        </div>
    );
};
export default FooterColumn;