import { Avatar, Badge } from 'antd';
import axios from 'axios';
import React from 'react';
import Resizer from "react-image-file-resizer";
import { useSelector } from 'react-redux';


const FileUpload = ({values,setValues,setLoading}) => {

       const {user}=useSelector((state)=>({...state}))
       let allUploadedFile=values.images;

    const fileUploadAndResize=(e)=>{
        setLoading(true);
        let file=e.target.files;
        if(file){
            for(let i=0;i<file.length;i++){
                Resizer.imageFileResizer(
                    file[i], 720, 720,"JPEG",100,0,
                     (uri)=>{
                         axios.post(`${process.env.REACT_APP_API}/uploadimages`,
                          {image:uri}, 
                          {
                            headers:{
                                  authtoken:user?user.token:"",
                                }
                            })
                          .then((res)=>{
                            setLoading(false)
                            allUploadedFile.push(res.data);
                            setValues({...values,images:allUploadedFile})
                           })
                          .catch((err)=>{
                            setLoading(false)    
                         }) 
                       },
                    "base64",
                );
            }
         }
     }
    const handleImageRemove=(public_id)=>{
        setLoading(true);
       axios.post(`${process.env.REACT_APP_API}/removeimages`,
                    {public_id}, 
                    {
                     headers:{
                          authtoken:user?user.token:"",
                        }
                   })
            .then((res)=>{
              setLoading(false);
              const{images}=values;
              const filteredImages=images.filter((im)=>{
                  return im.public_id!==public_id;
              })
              setValues({...values,images:filteredImages})
            })
            .catch((err)=>{
                setLoading(false);
                console.log(err);
            })
         }
    return (
       <>
             <div className="row">
             {
                values.images.map((img)=>(
                   <Badge 
                   count="X" 
                   onClick={()=>handleImageRemove(img.public_id)}
                   key={img.public_id} 
                   style={{cursor:"pointer"}}>
                        <Avatar 
                            shape="square"
                            src={img.url} 
                            size={100}
                            className="ml-3"
                        />
                    </Badge>
                   ))
               }
             </div>
        <div className="row mt-4 ml-1">
          <label className="btn btn-primary btn-raised">
             Choose file
             <input 
             type="file" 
             multiple
             hidden 
             accept="images/*" 
             onChange={fileUploadAndResize}
             />
            </label>  
          </div> 
       </>
    );
};
export default FileUpload