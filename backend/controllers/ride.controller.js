const rideService=require('../services/ride.service');
const {validationResult}=require('express-validator')


module.exports.createRide= async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {user,Pickup,Destination,vechileType}=req.body;
    try {
        console.log("Sending to CreateRide:", { user, Pickup, Destination, vechileType });
        const ride=await rideService.CreateRide({
            user:req.user._id,
            pickup:Pickup,
            destination:Destination,
            vechileType
        });

        
        res.status(201).json({ride});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};


module.exports.getFare=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {Pickup,Destination}=req.query;
    try {
        const fare=await rideService.getfare(Pickup,Destination);
        console.log("🚀 Fare Calculation Result:", fare);
        
        return res.json(fare);
    } catch (error) {
        return res.status(500).json({message:error.message});
        
    }
}