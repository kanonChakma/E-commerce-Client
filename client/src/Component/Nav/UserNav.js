import React from 'react';
import { Link } from 'react-router-dom';

const UserNav=()=>{

  const navStyle = {
    padding:"10px 20px",
    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
    height:"60vh",
    width: "200px"
  }

    return (
        <nav style={navStyle}>
            <ul className="nav  flex-column">
                <li className="nav-item">
                  <Link to="/user/history" className="nav-link">History</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/password" className="nav-link">Password</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/wishlist" className="nav-link">WishList</Link>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav;
