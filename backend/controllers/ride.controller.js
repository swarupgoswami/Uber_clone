const captainModel = require("../models/captain.models");
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.services");
const { validationResult } = require("express-validator");
const {sendMessageToSocketId}=require('../socket');


module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user, Pickup, Destination, vechileType } = req.body;
  try {
    console.log("Sending to CreateRide:", {
      user,
      Pickup,
      Destination,
      vechileType,
    });
    const ride = await rideService.CreateRide({
      user: req.user._id,
      pickup: Pickup,
      destination: Destination,
      vechileType,
    });
    const pickupCoordinates = await mapService.getAddresCoordinate(Pickup);
    console.log(pickupCoordinates);

    const ltd = parseFloat(pickupCoordinates.latitude);
    const lng = parseFloat(pickupCoordinates.longitude);


    if (isNaN(ltd) || isNaN(lng)) {
        return res.status(400).json({ message: "Invalid numeric values for latitude or longitude" });
    };


    console.log("Latitude:", ltd, "Longitude:", lng);



    console.log("Sending to getCaptainsInTheRadius:", { lng, ltd, radius: 2 });

    const captainsInRadius = await mapService.getCaptainsInTheRadius(ltd, lng, 50)
    console.log(captainsInRadius);

    ride.otp=''
    captainsInRadius.map(async captain =>{

      console.log(captain, ride);



      sendMessageToSocketId(captain.socketId,{
        event:'new-ride',
        data: ride
      })
    })

    res.status(201).json({ ride });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { Pickup, Destination } = req.query;
  try {
    const fare = await rideService.getfare(Pickup, Destination);
    console.log("🚀 Fare Calculation Result:", fare);

    return res.json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
