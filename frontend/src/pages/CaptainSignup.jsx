import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function CaptainSignup() {



  const[firstname,setfirstname]=useState('');
  const[lastname,setlastname]=useState('');
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const [userdata,setuserdata]=useState({});


  const submitHandler=(e)=>{
    e.preventDefault();
    setuserdata({fullname:{
      firstname:firstname,
      lastname:lastname
    },email:email,password:password});
    console.log(userdata);
    setemail('');
    setpassword('');
    setfirstname('');
    setlastname('');

  }



  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <form action="" onSubmit={(e)=>{submitHandler(e)}}>
      <h3 className='text-lg mb-2 font-medium'>whats you Name</h3>
      <div className='flex gap-2 mb-5'>
      <input
      value={firstname}
      onChange={(e)=>{setfirstname(e.target.value)}}
      
      className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base '
       type="text" required placeholder='firstname'/>
       <input
      value={lastname}
      onChange={(e)=>{setlastname(e.target.value)}}
      
      className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base '
       type="text" required placeholder='lastname'/>
      </div>

      <h3 className='text-lg mb-2 text-medium'>whats you email</h3>
      <input
      value={email}
      onChange={(e)=>{setemail(e.target.value)}}
      
      className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base mb-5'
       type="email" required placeholder='youremail@gmail.com'/>
      <h3 className='text-lg mb-2 text-medium'>enter your password</h3>
      <input
      value={password}
      onChange={(e)=>{setpassword(e.target.value)}}
      
      className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base mb-5'
      type="password" required placeholder='password'/>
      <button  className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-2'>login</button>
    </form>
    <p className='text-center'>already have an Account? <Link to='/login' className='text-blue-600'>login</Link></p>
    
    </div>
    <div>
      <p className='text-[10px] leading-tight text-gray-500 ml-[10px]'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure blanditiis molestias maxime obcaecati! Similique consectetur necessitatibus laboriosam. Necessitatibus saepe nostrum sunt deleniti eos, culpa adipisci ipsam molestias minus dolores magni aperiam, ducimus voluptatum. Quam, laborum iste doloremque autem quo neque.
      </p>
    </div>
  </div>
  )
}

export default CaptainSignup
