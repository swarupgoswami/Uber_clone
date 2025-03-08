const captainModel = require("../models/captain.models");
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.services");
const { validationResult } = require("express-validator");
const {sendMessageToSocketId}=require('../socket');
const rideModel=require('../models/ride.model');


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

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')


    captainsInRadius.map(async captain =>{

      console.log(captain, ride);



      sendMessageToSocketId(captain.socketId,{
        event:'new-ride',
        data: rideWithUser
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

module.exports.confirmRide=async(req,res)=>{
       console.log("incoming req body",req.body);
       const errors=validationResult(req);

       if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       }

       const {rideId}=req.body;

       try{
        const ride=await rideService.confirmRide({rideId,captain:req.captain});

        sendMessageToSocketId(ride.user.socketId,{
          event:'ride-confirmed',
          data:ride
        })




        return res.status(200).json(ride);
        
      }catch (err){
        console.error("Error in confirmRide:", err);
        return res.status(500).json({message:err.message});
      }
}

module.exports.startRide=async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide=async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
