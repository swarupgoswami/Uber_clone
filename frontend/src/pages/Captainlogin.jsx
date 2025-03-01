import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

function CAptainLogin() {
  const Navigate=useNavigate();
  
  const[Email,setEmail]=useState('');
  const[Password,setPassword]=useState('');


  const {Captain,setCaptain}=useContext(CaptainDataContext);

  



  const submitHandler=async (e)=>{
    e.preventDefault();
    const captain_data={email:Email,password:Password};
    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain_data);
    console.log(response.data);


    if(response.status===200){
      console.log(response.data);
      setCaptain(response.data.captain);
      console.log('the token is ')
      console.log(response.data.token);
      localStorage.setItem('token',response.data.token);
      console.log(localStorage.getItem('token'));
      Navigate('/captain-home');
    }


    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <form action="" onSubmit={(e)=>{submitHandler(e)}}>
        <h3 className='text-xl mb-2'>whats you email</h3>
        <input
        value={Email}
        onChange={(e)=>{setEmail(e.target.value)}}
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
         type="email" required placeholder='youremail@gmail.com'/>
        <h3 className='text-xl mb-2'>enter your password</h3>
        <input
        value={Password}
        onChange={(e)=>{setPassword(e.target.value)}}
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
        type="password" required placeholder='password'/>
        <button  className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-2'>login</button>
      </form>
      <p className='text-center'>new here?<Link to='/captain-signup' className='text-blue-600'>create new account as captain</Link></p>
      
      </div>
      <div>
        <Link to='/login'
        className=' flex items-center justify-center bg-[#4840FF] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>Sign in as user</Link>
      </div>
    </div>
  )

}

export default CAptainLogin
