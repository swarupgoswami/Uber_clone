import React from "react";
import { Link , useLocation } from "react-router-dom";
import { useContext,useEffect } from "react";
import { SocketContext } from "../context/socketContext";
import { useNavigate } from "react-router-dom";


const Riding = (props) => {
  const location=useLocation();
  const {ride}=location.state|| {};
  const {Socket}=useContext(SocketContext);
  const navigate=useNavigate();


  Socket.on('ride-ended',()=>{
    navigate('/home');
  })


  return (
    <div className="h-screen">
        <Link to='/home' className="fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"><i className="text-xl font-bold ri-home-fill"></i></Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDmN_CX-2e9_9gZyPQrWEFYzU-dMGDgtuLA&s"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-13"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555366873/assets/37/e0e5f7-29d6-492c-b903-2fd99353af02/original/Final_Lux.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-xl font-bold -mt-1 -mb-1">{ride.captain?.fullname?.firstname||'loading..'}</h2>
            <h4 className="text-xl font-medium">{ride.captain?.vechile?.plate}</h4>
            <p className="text-sm text-gray-700 ">maruti suzuki alto</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full mt-5">
            <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">make a payment</button>

            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-fill"></i>
              <div className="">
                <h3 className="font-bold text-xl">562/11-A</h3>
                <p className="text-gray-500">{ride.destination}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3 ">
              <i className="text-lg ri-money-dollar-box-line"></i>
              <div className="">
                <h3 className="font-bold text-xl">₹{ride.fare}</h3>
                <p className="text-gray-500">{ride.destination}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
