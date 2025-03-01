import React from 'react'
import { Link } from 'react-router-dom'
import FinishRidePanel from '../components/FinishRidePanel'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useState } from 'react';



const CaptainRiding = () => {


  const [finishridePanel,setfinishridePanel]=useState(false);
  const finishridePanelRef=useRef(null);






  useGSAP(() => {
    if (finishridePanel) {
      gsap.to(finishridePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishridePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishridePanel]);
  return (
    <div>
      <div className="">
        <img src="" alt="" />
        <Link
          to="/captain-home"
          className="fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-xl font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5 ">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDmN_CX-2e9_9gZyPQrWEFYzU-dMGDgtuLA&s"
          alt=""
        />
      </div>
      <div onClick={()=>{
        setfinishridePanel(true);
      }}
       className="h-1/5 p-6 flex items-center justify-between">
          <h4 className='text-2xl font-bold'>4 KM away</h4>
          <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>COMPLETE</button>
      </div>
      <div
        ref={finishridePanelRef}
        className="w-full fixed z-10 bottom-0 p-3 translate-y-full  bg-white py-10  "
      >
        <FinishRidePanel setfinishridePanel={setfinishridePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
