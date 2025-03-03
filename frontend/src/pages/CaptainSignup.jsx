import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CaptainSignup() {
  const Navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userdata, setuserdata] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vechile: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vechileType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      captainData
    );

    if (response.status === 201) {
      console.log(response.data);
      console.log("Setting Captain:", response.data.captain);
      setCaptain(response.data.captain);

      // setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      Navigate("/captain-home");
    }

    setemail("");
    setpassword("");
    setfirstname("");
    setlastname("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2 font-medium">whats you Name</h3>
          <div className="flex gap-2 mb-5">
            <input
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base "
              type="text"
              required
              placeholder="firstname"
            />
            <input
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              className="w-1/2 bg-[#eeeeee] rounded px-4 py-2 border text-lg placeholder:text-base "
              type="text"
              required
              placeholder="lastname"
            />
          </div>

          <h3 className="text-lg mb-2 text-medium">whats you email</h3>
          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base mb-5"
            type="email"
            required
            placeholder="youremail@gmail.com"
          />
          <h3 className="text-lg mb-2 text-medium">enter your password</h3>
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base mb-5"
            type="password"
            required
            placeholder="password"
          />

          <h3 className="text-lg mb-2 font-medium">Vehicle Information</h3>
          <div className="mb-5">
            <label className="block mb-2">Vehicle Color</label>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base"
              type="text"
              required
              placeholder="Vehicle Color"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Vehicle Plate</label>
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base"
              type="text"
              required
              placeholder="Vehicle Plate"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Vehicle Capacity</label>
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base"
              type="number"
              required
              placeholder="Vehicle Capacity"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2">Vehicle Type</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-base"
              required
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-2">
            create Captain Account
          </button>
        </form>
        <p className="text-center">
          already have an Account?{" "}
          <Link to="/login" className="text-blue-600">
            login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-gray-500 ml-[10px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
          blanditiis molestias maxime obcaecati! Similique consectetur
          necessitatibus laboriosam. Necessitatibus saepe nostrum sunt deleniti
          eos, culpa adipisci ipsam molestias minus dolores magni aperiam,
          ducimus voluptatum. Quam, laborum iste doloremque autem quo neque.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
