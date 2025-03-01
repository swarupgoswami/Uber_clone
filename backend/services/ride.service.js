const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.services");
// const bcrypt = require('bcrypt');
const crypto = require('crypto');

const getfare = async (pickup, destination) => {
    if (!pickup || !destination) {
      throw new Error("pickup and destination is required");
    }
    const distanceTime = await mapService.getDistanceAndtime(
      pickup,
      destination
    );
    const fareRates = {
      auto: 5, // rate per km
      motorcycle: 10, // rate per km
      car: 20 // rate per km
    };

    const calculateFare = (distance, vehicleType) => {
      if (!fareRates[vehicleType]) {
        throw new Error("Invalid vehicle type");
      }
      const distanceinKM= distance / 1000
      return distanceinKM * fareRates[vehicleType];
    };

    const fare = {
      auto: calculateFare(distanceTime.distance, 'auto'),
      motorcycle: calculateFare(distanceTime.distance, 'motorcycle'),
      car: calculateFare(distanceTime.distance, 'car')
    };

    return {
      distance: distanceTime.distance,
      time: distanceTime.time,
      fare
    };
}; 


const getOTP=(num)=>{
    const generateOTP = (num) => {
      const otp = Math.floor(Math.pow(10, num-1) + Math.random() * (Math.pow(10, num) - Math.pow(10, num-1)));
      const hashedOTP = crypto.createHash('sha256').update(otp.toString()).digest('hex');
      return hashedOTP;
    };

    return generateOTP(num);
}




module.exports.CreateRide = async ({
    user,pickup,destination,vechileType
}) => {
    if(!user || !pickup|| !destination || !vechileType){
        throw new Error('all field are required')
    }
    const fare =await getfare(pickup,destination);

    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:getOTP(6),
        fare:fare[vechileType]

    })
    return ride;
    

};
