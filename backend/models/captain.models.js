const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'firstname must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minLength:[3,'lastname must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'invalid email']
    },
    password:{
        type:String,
        select:false,
        required:true,
        minLength:[8,'password must be at least 8 characters long'],
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vechile:{
        color:{
            type:String,
            required:true,
            minLength:[3,'color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'plate must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be at least 1'],
        },
        vechileType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        }
    },
    location:{
        ltd:{
            type:Number,
            
        },
        lng:{
            type:Number,
            
        },

    }

})

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
};


captainSchema.statics.hashpassword=async function(password){
    return await bcrypt.hash(password,10);
}



captainSchema.methods.comparePassword=async function(Password){
    return await bcrypt.compare(Password,this.password);
}

const captainModel=mongoose.model('captain',captainSchema);

module.exports=captainModel;