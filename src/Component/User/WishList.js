import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserWishList, updateUserWishList } from '../../common/user';
import UserNav from '../nav/UserNav';
import { Card, Avatar } from 'antd';
import { EyeOutlined,DeleteOutlined} from '@ant-design/icons';
import laptop from "../../image/laptop.jpg"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const WishList=() => {
  const{user}=useSelector((state)=>({...state}));
  const[whisList,setWishList]=useState([]);
  
  useEffect(()=>{
    loadWhisList()
  },[])
  const loadWhisList=()=>{
      getUserWishList(user.token)
      .then((res)=>setWishList(res.data.wishList))
  }
  const handleRemove=(productId)=>{
    updateUserWishList(productId,user.token)
    .then(res=>{
      if(res.data.ok){
        toast.success("Remove Product From WhiList");
        loadWhisList()
      }
    })
  }
  return(
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
              <UserNav/>
        </div>
        <div className="col">
           <div className='row'>
             {
               whisList.map((p)=>(
                <div key={p._id} className='col-md-3 m-3'>
                    <Card
                style={{ width: 300 }}
                cover={
                  <div style={{overflow:"hidden",height:"200px"}}>
                  <img
                    style={{height:"100%",
                    width:"100%",
                    objectFit:"cover"}
                    }
                    alt="example"
                    src={p.images.length>0?p.images[0].url:laptop}
                  />
                  </div>
                }
                actions={[
                  <Link to={`/product/${p.slug}`}>
                    <EyeOutlined/>
                  </Link>,
                  <a onClick={()=>handleRemove(p._id)}>
                      <DeleteOutlined key="delete" />
                  </a>,
                ]}
                >
                  </Card>
                </div>
               ))
             }
           </div>
        </div>
     </div>
   </div> 
  )
}

export default WishList;