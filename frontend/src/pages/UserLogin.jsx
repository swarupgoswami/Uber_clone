import React, { useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserLogin() {
  const[Email,setEmail]=useState('');
  const[Password,setPassword]=useState('');

  const[userdata,setuserdata]=useState({});
  const Navigate=useNavigate();

  const {user,setuser}=useContext(UserDataContext);



  const submitHandler=async (e)=>{
    e.preventDefault();
    const userData={
      email:Email,
      password:Password
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);
    if(response.status===200){
      console.log(response.data);
      setuser(response.data.user);
      localStorage.setItem('token',response.data.token);
      Navigate('/home');
    }
    console.log(userdata);
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
      <p className='text-center'>new here?<Link to='/signup' className='text-blue-600'>create new account</Link></p>
      
      </div>
      <div>
        <Link to='/captain-login'
        className=' flex items-center justify-center bg-[#0B9E48] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>Sign in as captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
