const mapService=require('../services/maps.services');
const {validationResult}=require('express-validator');



module.exports.getCoordinates=async(req,res,next)=>{


    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }





    const {address}=req.query;

    try {
        const coordinates=await mapService.getAddresCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message:'cordinates not found'});
        
    }
}

module.exports.getDistanceTime=async(req,res,next)=>{
    try {
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()});


        }
        const {origin,destination}=req.query;
        const distanceTime=await mapService.getDistanceAndtime(origin,destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({message:"internal server error"});
        
    }
}

module.exports.getAutoCompleteSuggestions=async(req,res,next)=>{
    try {
        const error=validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json({errors:error.array() });
        }
        const {input}=req.query;
        const suggestion=await mapService.getAutoCompletesuggestion(input);
        res.status(200).json(suggestion);
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({message:'internal server error'});
        
    }
}