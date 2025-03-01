import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className="text-center p-3 absolute top-0 w-[90%] ">
        {/* <i
          onClick={() => {
            props.setvechilePanelOpen(false);
          }}
          className="text-xl ri-arrow-down-long-line"
        ></i> */}
      </h5>
      <h3 className="text-xl font-bold text-medium mb-3">confirm your ride</h3>

      <div className="flex flex-col justify-between items-center gap-2">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555366873/assets/37/e0e5f7-29d6-492c-b903-2fd99353af02/original/Final_Lux.png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="font-bold text-xl">562/11-A</h3>
              <p className="text-gray-500">kankariya Talab , Ahemdabad</p>
            </div>
          </div>




          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="font-bold text-xl">562/11-A</h3>
              <p className="text-gray-500">kankariya Talab , Ahemdabad</p>
            </div>
          </div>




          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-money-dollar-box-line"></i>
            <div className="">
              <h3 className="font-bold text-xl">$10</h3>
              <p className="text-gray-500">kankariya Talab , Ahemdabad</p>
            </div>
          </div>



        </div>
        <button onClick={()=>{
          props.setvechileFound(true)
          props.setconfirmRidePanel(false)
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
