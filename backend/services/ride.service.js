const { error } = require("console");
const rideModel = require("../models/ride.model");
const userModel = require("../models/user.model");
const mapService = require("../services/maps.services");
// const bcrypt = require('bcrypt');
const crypto = require("crypto");

const getfare = async (Pickup, Destination) => {
  if (!Pickup || !Destination) {
    throw new Error("pickup and destination is required");
  }
  const distanceTime = await mapService.getDistanceAndtime(Pickup, Destination);
  const fareRates = {
    auto: 5, // rate per km
    motorcycle: 10, // rate per km
    car: 20, // rate per km
  };

  const calculateFare = (distance, vehicleType) => {
    if (!fareRates[vehicleType]) {
      throw new Error("Invalid vehicle type");
    }
    const distanceinKM = distance / 1000;
    return distanceinKM * fareRates[vehicleType];
  };

  const fare = {
    auto: calculateFare(distanceTime.distance, "auto"),
    motorcycle: calculateFare(distanceTime.distance, "motorcycle"),
    car: calculateFare(distanceTime.distance, "car"),
  };

  return {
    distance: distanceTime.distance,
    time: distanceTime.time,
    fare,
  };
};

module.exports.getfare = getfare;

const getOTP = (num = 4) => {
  const otp = Math.floor(
    Math.pow(10, num - 1) +
      Math.random() * (Math.pow(10, num) - Math.pow(10, num - 1))
  );
  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp.toString())
    .digest("hex");
  return otp.toString();
};

module.exports.CreateRide = async ({
  user,
  pickup,
  destination,
  vechileType,
}) => {
  console.log("Received data in CreateRide:", {
    user,
    pickup,
    destination,
    vechileType,
  });
  if (!user || !pickup || !destination || !vechileType) {
    throw new Error("all field are required");
  }
  const fare = await getfare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(),
    fare: fare.fare[vechileType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};
