import React from 'react'

const VechilePanel = (props) => {
  return (
    <div>
      <h5 className='text-center p-3 absolute top-0 w-[90%] '><i
        onClick={()=>{
          props.setvechilePanelOpen(false)

        }} className="text-3xl ri-arrow-down-long-line"></i></h5>
        <h3 className='text-xl font-bold text-medium mb-3'>choose a vechile</h3>
        <div 
        onClick={()=>{
            props.setconfirmRidePanel(true)
        }} className="w-full border-2 border-gray-300 active:border-black  rounded-lg  flex items-center justify-between mb-2">
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555366873/assets/37/e0e5f7-29d6-492c-b903-2fd99353af02/original/Final_Lux.png" alt="car" />
          <div className="w-1/2">
            <h4 className='font-bold text-sm'>Zippy Rides <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600' >afforadable  , compact rides</p>
          </div>
          <h2 className='texet-2xl font-bold pr-[10px]'>$5</h2>
        </div>
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
        }}
         className="w-full border-2 border-gray-300 active:border-black  rounded-lg  flex items-center justify-between mb-2">
          <img className='h-15 pl-[15px]' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car" />
          <div className="w-1/2">
            <h4 className='font-bold text-sm'>Zippy Rides <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600' >afforadable  , compact rides</p>
          </div>
          <h2 className='texet-2xl font-bold pr-[10px]'>$5</h2>
        </div>
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
        }} className="w-full border-2 border-gray-300 active:border-black  rounded-lg  flex items-center justify-between mb-2">
          <img className='h-15 pl-[15px]' src="https://static.vecteezy.com/system/resources/previews/026/900/609/non_2x/male-food-delivery-driver-sit-on-scoot-or-motorcycle-waved-hand-to-tell-customer-that-food-has-arrived-and-all-place-on-transparent-background-png.png" alt="car" />
          <div className="w-1/2">
            <h4 className='font-bold text-sm'>Zippy Rides <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600' >afforadable  , compact rides</p>
          </div>
          <h2 className='texet-2xl font-bold pr-[10px]'>$5</h2>
        </div>
        <div className="w-full  border-2 border-gray-300 active:border-black rounded-lg  flex items-center justify-between mb-2">
          <img className='h-13 pl-[10px]' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="car" />
          <div className="w-1/2">
            <h4 className='font-bold text-sm'>Zippy Rides <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600' >afforadable  , compact rides</p>
          </div>
          <h2 className='texet-2xl font-bold pr-[10px]'>$5</h2>
        </div>
    </div>
  )
}

export default VechilePanel
 