import React from 'react';
import UserNav from '../Nav/UserNav';

const WishList=() => {
  return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
              <UserNav/>
        </div>
        <div className="col">
            <h1>Hello This is WishList page!</h1>
        </div>
    </div>
  </div> 
  )
}
export default WishList;