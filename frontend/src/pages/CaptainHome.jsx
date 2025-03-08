import React from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { useRef } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/socketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function CaptainHome() {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmridePopupPanelRef = useRef(null);

  const { Socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    Socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userID: captain._id,
            location: {
              userId: captain._id,
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          Socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              userId: captain._id,
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval);
  });

  Socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setridePopupPanel(true);
  });

  // useEffect(() => {
  //   const handleRideConfirmed = (data) => {
  //     console.log("Ride confirmed event received:", data);
  //     setRide(data);
  //     setridePopupPanel(true);
  //   };
  
  //   Socket.on("ride-confirmed", handleRideConfirmed);
  
  //   return () => {
  //     Socket.off("ride-confirmed", handleRideConfirmed);
  //   };
  // }, [Socket]);

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setridePopupPanel(false);
    setconfirmridePopupPanel(true);
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmridePopupPanel) {
      gsap.to(confirmridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmridePopupPanel]);

  return (
    <div className="h-screen">
      <div className="">
        <img src="" alt="" />
        <Link
          to="/home"
          className="fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-xl font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5 ">
        <img
          className="h-full w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDmN_CX-2e9_9gZyPQrWEFYzU-dMGDgtuLA&s"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="w-full fixed z-10 bottom-0 p-3 translate-y-full  bg-white py-10  "
      >
        <RidePopUp
          ride={ride}
          setridePopupPanel={setridePopupPanel}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmridePopupPanelRef}
        className="w-full fixed z-10 bottom-0 p-3 translate-y-full  bg-white py-10 h-screen  "
      >
        <ConfirmRidePopUp
          ride={ride}
          setridePopupPanel={setridePopupPanel}
          setconfirmridePopupPanel={setconfirmridePopupPanel}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
