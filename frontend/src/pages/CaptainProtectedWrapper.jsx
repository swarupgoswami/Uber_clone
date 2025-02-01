import React from 'react'
import { useContext ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'


function CaptainProtectedWrapper({children}) {
    const{captain,setcaptain}=useContext(CaptainDataContext);
    const[isLoading,setisLoading]=useState(true);
    const Navigate=useNavigate();
    const token=localStorage.getItem('token');

    console.log(token);
  
      useEffect(()=>{
          if(!token){
              Navigate('/captain-login');
          }


      },[token])

      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{headers:{authorization:`Bearer ${token}`}}
      ).then(response =>{
        if(response.status===200){
            setcaptain(response.data);
            setisLoading(false);
        }
      }).catch(error=>{
          console.log(error);
          localStorage.removeItem('token');
          setisLoading(false);
      })

      if(isLoading){
          return <div>Loading...</div>
      }


    return (
  
  
      <div className="">
          {children}
      </div>
  
      
    )
}

export default CaptainProtectedWrapper
