import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className="text-center p-3 absolute top-0 w-[90%] ">
        <i
          onClick={() => {
            props.setwaitingPanel(true);
          }}
          className="text-xl ri-arrow-down-long-line"
        ></i>
      </h5>
      <div className='flex items-center justify-between'>
        <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555366873/assets/37/e0e5f7-29d6-492c-b903-2fd99353af02/original/Final_Lux.png" alt="" />
        <div className="text-right">
          <h2 className='text-xl font-bold -mt-1 -mb-1'>{props.ride?.captain?.fullname?.firstname|| "Loading..."}</h2>
          <h4 className='text-xl font-medium'>{props.ride?.captain?.vechile?.plate|| "Loading..."}</h4>
          <p className='text-sm text-gray-700 '>maruti suzuki alto</p>
          <h4 className='text-lg font-semibold'>{props.ride?.otp||'loading..'}</h4>
        </div>
      </div>
      

      <div className="flex flex-col justify-between items-center gap-2">
        
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="font-bold text-xl">562/11-A</h3>
              <p className="text-gray-500">{props.ride?.pickup|| "Loading..."}</p>
            </div>
          </div>




          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="font-bold text-xl">562/11-A</h3>
              <p className="text-gray-500">{props.ride?.destination|| "Loading..."}</p>
            </div>
          </div>




          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-money-dollar-box-line"></i>
            <div className="">
              <h3 className="font-bold text-xl">$10</h3>
              <p className="text-gray-500">{props.ride?.fare|| "Loading..."}</p>
            </div>
          </div>



        </div>
        
      </div>
    </div>
  )
}

export default WaitingForDriver