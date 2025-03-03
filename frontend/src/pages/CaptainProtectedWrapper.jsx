import React from 'react'
import { useState } from 'react'
import { useContext ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'


function CaptainProtectedWrapper({children}) {
    const{Captain,setCaptain}=useContext(CaptainDataContext);
    const[isLoading,setisLoading]=useState(true);
    const Navigate=useNavigate();
    const token=localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
            Navigate('/captain-home')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response =>{
            if(response.status===200){
                setCaptain(response.data)
                setisLoading(false)
            }
        }).catch(err =>{
            localStorage.removeItem('token')
            Navigate('/captain-login')
        })
    },[token])

    if(isLoading){
        return(
            <div className="">loading</div>            
        )
    }
    return (
  
  
        <div className="">
            {children}
        </div>
    
        
      )
  
    



    
}

export default CaptainProtectedWrapper
