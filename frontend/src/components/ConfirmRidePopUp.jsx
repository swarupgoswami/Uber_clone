import React, { useState } from "react";
import { Link } from "react-router-dom";



const ConfirmRidePopUp = (props) => {

  const [otp,setotp]=useState('')

  const submithandler=(e)=>{
    e.preventDefault();

  }

  return (
    <div className="">
      <h5 className="text-center p-3 absolute top-0 w-[90%] ">
        <i
          onClick={() => {
            props.setconfirmridePopupPanel(false);
          }}
          className="text-xl ri-arrow-down-long-line"
        ></i>
      </h5>
      <h3 className="text-xl font-bold text-medium mb-3">
        CONFIRM YOUR RIDE! !
      </h3>
      <div className="flex  items-center  justify-between">
        <div className="flex items-center gap-4 ">
          <img
            className="rounded-full w-10 h-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s"
            alt=""
          />
          <h2 className="text-xl font-semibold">customer's Name</h2>
        </div>
        <h2 className="text-m font-semibold">2.2 KM</h2>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
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

        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <input value={otp} onChange={(e)=>{
              setotp(e.target.value)
            }}
              type="text"
              placeholder="enter the OTP"
              className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-3"
            />
            <Link
              to="/captainriding"
              className="mt-5 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              CONFIRM
            </Link>
            <button
              onClick={() => {
                props.setconfirmridePopupPanel(false);
                props.setridePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-800 text-white font-semibold p-2 rounded-lg"
            >
              CANCEL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
