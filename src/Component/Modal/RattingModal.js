import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Modal} from 'antd';
import {StarOutlined } from '@ant-design/icons';


const RattingModal = ({children}) => {
    const[isModalVisible,setIsModalVisible]=useState(false);
    const[modalCancel,setModalCancel]=useState(false);
    const {user} = useSelector(state =>({...state}))
    return (
        <>
             <div>
                <StarOutlined className='text-danger' onClick={()=>setIsModalVisible(true)}/>
                  <br/>
               {user?"Leave rating":"Login to leave rating"}
             </div>  
             <Modal 
                centered
                title="Basic Modal" 
                visible={isModalVisible}
                onOk={()=>{
                    setIsModalVisible(false)
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