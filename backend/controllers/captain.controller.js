const captainServices = require('../services/captain.services');
const captainModel = require('../models/captain.models');
const{validationResult}=require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res,next) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vechile} = req.body;

    const isCaptainAlreadyExist=await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message:'captain already exist'});
    }
    
    const hashpassword=await captainModel.hashpassword(password);

    const captain= await captainServices.registerCaptain({firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashpassword,color:vechile.color,plate:vechile.plate,capacity:vechile.capacity,vechileType:vechile.vechileType});


    const token=await captain.generateAuthToken();

    res.status(201).json({token,captain});
}    


module.exports.loginCaptain = async (req, res,next) => {


    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;

    const captain= await captainModel.findOne({email}).select('+password');


    if(!captain){
        return res.status(401).json({message:'captain not found'});
    }
    const isMatch=await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'invalid password'});
    }
    const token=await captain.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile=async(req,res,next)=>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain=async(req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});



    res.clearCookie('token');
    res.status(200).json({message:'captain logout'});
}

