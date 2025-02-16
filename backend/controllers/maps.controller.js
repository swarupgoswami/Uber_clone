const mapService=require('../services/maps.services');
const {validationResult}=require('express-validator');



module.exports.getCoordinates=async(req,res,next)=>{


    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }





    const {address}=req.body;

    try {
        const coordinates=await mapService.getAddresCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message:'cordinates not found'});
        
    }
}

module.exports.getDistanceTime=async(req,res,next)=>{
    
}