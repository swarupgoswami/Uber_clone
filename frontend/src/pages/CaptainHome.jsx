import React from 'react'
import { Link } from 'react-router-dom'

function CaptainHome() {
  return (
    <div className="h-screen">
        <div className="">
          <img src="" alt="" />
          <Link to='/home' className="fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"><i className="text-xl font-bold ri-logout-box-r-line"></i></Link>
        </div>
      <div className="h-3/5 ">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDmN_CX-2e9_9gZyPQrWEFYzU-dMGDgtuLA&s"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4 ">
            <img className='h-10 w-10 rounded-[100%] object-cover' src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="" />

            <h4 className='text-lg font-medium'> Captain's Name</h4>

          </div>
          <div className="">
            <h4 className='text-xl font-semibold'>₹295</h4>
            <p className='text-sm  text-gray-600'>Earned</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-5 items-start bg-gray-100">
          
            <div className="text-center">
            <i className="mb-2 text-3xl ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-gray-600'>Hours online</p>
            </div>



            <div className="text-center">
            <i className="mb-2 text-3xl ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-gray-600'>Hours online</p>
            </div>



            <div className="text-center">
            <i className="mb-2 text-3xl ri-booklet-fill"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-gray-600'>Hours online</p> 
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default CaptainHome
