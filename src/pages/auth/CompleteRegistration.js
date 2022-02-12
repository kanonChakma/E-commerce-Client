import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrUpdate } from '../../common/authData';
import { auth } from '../../firebase';

const CompleteRegistration = ({history}) => {
 
    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const dispatch=useDispatch();
    
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    },[])
    const handleSubmit = async (e) => {
       try{
        e.preventDefault();
           const result = await auth.signInWithEmailLink(email,window.location.href);
          if(result.user.emailVerified)
            {
                //Remove user email from local Storage
                window.localStorage.removeItem('emailForRegistration');
                let user =auth.currentUser;
                console.log(user);
                await user.updatePassword(password);
                const idTokenResult=await user.getIdTokenResult();
                createOrUpdate(idTokenResult.token)
                .then((res)=>{
                    dispatch({
                        type: 'USER_LOGGED_IN',
                        payload: {
                            name:res.data.name,
                            email:res.data.email,
                            role:res.data.role,
                            token: idTokenResult.token,
                            _id:res.data._id
                        }
                    })
                })
                .catch((err)=>console.log(err))  
                history.push("/login");
            }   
         }catch(error){
            toast.error(error.message);
        }
    }
    const CompleteregisterForm = () =>
        <form onSubmit={handleSubmit}>
            <input 
             type="email" 
             className="form-control" 
              value={email}
             disabled
            />
           <br/>
             <input 
             type="password" 
             className="form-control" 
             onChange={e=>setPassword(e.target.value)}
             autoFocus
            />
              <br/>
              <br/>
            <button type="submit" className="btn btn-raised">Complete Register</button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {CompleteregisterForm()}
                </div>
            </div>
        </div>
    );
};

export default CompleteRegistration;