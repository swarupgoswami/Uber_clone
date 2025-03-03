import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
  

  const {captain}=useContext(CaptainDataContext);





  return (
    <div>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4 ">
            <img
              className="h-10 w-10 rounded-[100%] object-cover"
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt=""
            />

            <h4 className="text-lg font-medium capitalize">{captain?.fullname?.firstname || "Loading..."}  {captain.fullname.lastname}</h4>
          </div>
          <div className="">
            <h4 className="text-xl font-semibold">₹295</h4>
            <p className="text-sm  text-gray-600">Earned</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-5 items-start bg-gray-100">
          <div className="text-center">
            <i className="mb-2 text-3xl ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-gray-600">Hours online</p>
          </div>

          <div className="text-center">
            <i className="mb-2 text-3xl ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-gray-600">Hours online</p>
          </div>

          <div className="text-center">
            <i className="mb-2 text-3xl ri-booklet-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-gray-600">Hours online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
