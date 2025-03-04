const userModel = require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const captainModel = require('../models/captain.models');
const blackListTokenModel=require('../models/blacklistToken.model');

module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization ?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    const isBlacklisted=await userModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:'unauthorized'});
        
    }

    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        req.user=user;
        next();
        console.log("Authenticated user:", req.user);

    }catch(err){
        return res.status(401).json({message:'unauthorized'});
    }   


}

module.exports.authCaptain=async(req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    const isBlacklisted=await blackListTokenModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:'unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(404).json({message:'captain not found'});
        }
        req.captain=captain;
        next();
    }catch(err){    
        return res.status(401).json({message:'unauthorized'});
    }

}



