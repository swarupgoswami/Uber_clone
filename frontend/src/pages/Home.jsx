import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import LocationSerachpanel from "../components/LocationSerachpanel";
import VechilePanel from "../components/VechilePanel";
import ConfirmRide from "../components/confirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

function Home() {
  const [Pickup, setPickup] = useState("");
  const [Destination, setDestination] = useState("");
  const [Panel, setPanel] = useState(false);
  const panelRef = useRef(null);
  const panelCLoseRef = useRef(null);
  const [vechilePanelOpen, setvechilePanelOpen] = useState(false);
  const vechilePanelRef = useRef(null);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vechileFound, setvechileFound] = useState(false);
  const vechileFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingPanel, setwaitingPanel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [currentField, setCurrentField] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion?input=${query}`,{
          headers: {
            Authorization: `Bearer ${token}`, // Ensure Bearer is included
          },
        });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (currentField === "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setPanel(false);
    setSuggestions([]);
    // Optionally, you can open the next panel after selection
    setvechilePanelOpen(true);
};

  


  // panel gsap
  useGSAP(() => {
    if (Panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        opacity: 1,
        padding: 24,
      });
      gsap.to(panelCLoseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0",
        opacity: 0,
        padding: 0,
      });
      gsap.to(panelCLoseRef.current, {
        opacity: 0,
      });
    }
  }, [Panel]);

  // vechile panel gsap
  useGSAP(() => {
    if (vechilePanelOpen) {
      gsap.to(vechilePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vechilePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vechilePanelOpen]);
  // confirm ride panel gsap
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  // waiting for driver panel
  useGSAP(() => {
    if (vechileFound) {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vechileFound]);

  // waitingpanel gsap
  useGSAP(() => {
    if (waitingPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingPanel]); 

    // When user clicks a suggestion from the LocationSerachpanel
  




  return (
    <div className="h-screen relative overflow-hidden ">
      <div
        onClick={() => {
          setvechilePanelOpen(false);
        }}
        className="w-screen h-screen"
      >
        {/* temporary image */}
        <img
          className="w-full h-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDmN_CX-2e9_9gZyPQrWEFYzU-dMGDgtuLA&s"
          alt="map"
        />
      </div>
      <div className="text-black h-screen  flex flex-col justify-end absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          {/* icon */}
          <h5
            ref={panelCLoseRef}
            onClick={() => {
              setPanel(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">start your ride</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[40%] bg-gray-900 left-10 rounded-full"></div>
            <input
              onFocus={() => {
                setPanel(true);
                setCurrentField("pickup");
              }}
              value={Pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="select your pickup location"
            />
            <input
              onFocus={() => {
                setPanel(true);
                setCurrentField("destination");
              }}
              value={Destination}
              onChange={(e) => {setDestination(e.target.value);
                fetchSuggestions(e.target.value);}}
              className="bg-[#eeee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="select you destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="opacity-0 h-0 bg-white-500">
          <LocationSerachpanel
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            setPanel={setPanel}
            setvechilePanelOpen={setvechilePanelOpen}
          />
        </div>
      </div>

      {/* another componenet */}
      <div
        ref={vechilePanelRef}
        className="w-full fixed z-10 bottom-0 p-3 bg-white py-10 translate-y-full "
      >
        <VechilePanel
          setconfirmRidePanel={setconfirmRidePanel}
          setvechilePanelOpen={setvechilePanelOpen}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="w-full fixed z-10 bottom-0 p-3 bg-white py-6 translate-y-full "
      >
        <ConfirmRide
          setconfirmRidePanel={setconfirmRidePanel}
          setvechilePanelOpen={setvechilePanelOpen}
          setvechileFound={setvechileFound}
        />
      </div>
      <div
        ref={vechileFoundRef}
        className="w-full fixed z-10 bottom-0 p-3 bg-white py-6 translate-y-full "
      >
        <LookingForDriver setvechileFound={setvechileFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="w-full fixed z-10 bottom-0 p-3 bg-white py-6  "
      >
        <WaitingForDriver setwaitingPanel={setwaitingPanel} />
      </div>
    </div>
  );
}

export default Home;
