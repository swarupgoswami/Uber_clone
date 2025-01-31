import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className='h-screen flex justify-between flex-col w-full bg-red-400 bg-[url(/src/assets/zippy-rides.jpg)] bg-cover bg-center'>
        <img src="" alt="" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className='text-3xl font-bold'>Get started with zippy-rides</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white rounded-lg py-3 mt-2'>continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
