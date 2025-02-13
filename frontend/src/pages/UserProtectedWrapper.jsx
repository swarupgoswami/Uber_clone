import React from 'react'
import { useContext ,useEffect } from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({children}) => {



    const {user}=useContext(UserDataContext);
    const Navigate=useNavigate();
    const token=localStorage.getItem('token');

    useEffect(()=>{
        if(!token){
            Navigate('/login');
        }
    },[token])
  return (


    <div className="">
        {children}
    </div>

    
  ) 
}

export default UserProtectedWrapper
