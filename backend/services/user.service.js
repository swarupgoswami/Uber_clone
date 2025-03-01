const userModel=require('../models/user.model');

module.exports.createUser=async({firstname,lastname,email,password})=>{
    if(!firstname || !lastname || !email || !password){
        throw new Error('all fields are required');
    }

    const isUserAlreadyExist=await userModel.findOne({email});

    if(isUserAlreadyExist){
        throw  Error('user already exist');
    }



    const user=await userModel.create({fullname:{
        firstname,
        lastname
    },
    email,
    password 
   })
   return user;
}
