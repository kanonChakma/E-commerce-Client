import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Modal} from 'antd';
import {StarOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

const RattingModal = ({children}) => {
    
    const[isModalVisible,setIsModalVisible]=useState(false);
    const {user} = useSelector(state =>({...state}))
    const history=useHistory();
    const {slug} =useParams();

    const handleModel=()=>{

      if(user && user.token){
          setIsModalVisible(true);   
      }else{
        history.push({
          pathname:"/login",
          state:{ from:`/product/${slug}`},
         });
       }
    }
    return (
        <>
             <div onClick={handleModel}>
                <StarOutlined className='text-danger' onClick={()=>setIsModalVisible(true)}/>
                  <br/> {" "}
               {user?"Leave rating":"Login to leave rating"}
             </div>  
             <Modal 
                centered
                title="Basic Modal" 
                visible={isModalVisible}
                onOk={()=>{
                    setIsModalVisible(false)
                    toast.success("Thanks for your review")
                 }} 
                onCancel={()=>setIsModalVisible(false)}>
                 {
                   children
                 }
            </Modal>
        </>
    );
};

export default RattingModal;