const mongoose=require('mongoose');



const rideSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        // required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captain',
        // required:true
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        // required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending'
    },
    // in seconds
    duration:{
        type:Number,

    },
    // in meters
    distance:{
        type:Number
    },
    paymentID:{
        type:String,

    },
    orderID:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
        required:true


    }

})


module.exports = mongoose.model('Ride', rideSchema);
