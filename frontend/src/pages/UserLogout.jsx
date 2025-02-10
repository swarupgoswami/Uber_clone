import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserLogout() {


    const navigate=useNavigate();

    const token=localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`,{headers:{'Authorization':`Bearer ${token}`}}

    ).then((response)=>{
        if(response.status===200){
            localStorage.removeItem('token');
            navigate('/login');
        }
    })



  return (
    <div>
      userLogout
    </div>
  )
}

export default UserLogout
