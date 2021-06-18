import React from 'react';
import {Link} from 'react-router-dom';

const UserNav=()=>{
    return (
        <nav>
            <ul className="nav">
                <li className="nav-item">
                  <Link to="/user/history">History</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/password">Password</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/wishList">WishList</Link>
                </li>
            </ul>
        </nav>
    )
}
export default UserNav;
