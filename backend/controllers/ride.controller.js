const rideService=require('../services/ride.service');
const {validationResult}=require('express-validator')


module.exports.createRide= async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {userID,pickup,destination,vechileType}=req.body;
    try {
        const ride=await rideService.CreateRide({
            user:req.user._id,
            pickup,
            destination,
            vechileType
        });
        res.status(201).json({ride});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}