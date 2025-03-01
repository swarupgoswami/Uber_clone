const dotenv=require('dotenv');
dotenv.config();
const express = require('express');
const app=express();
const cors=require('cors');
const connectTodb=require('./db/db');
const userRoutes=require('./routes/user.routes');
const cokieParser=require('cookie-parser');
const captainRoutes=require('./routes/captain.routes');
const MapRoutes=require('./routes/maps.routes');
const RideRoutes=require('./routes/rides.routes');



connectTodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cokieParser());
app.use('/user',userRoutes);  
app.use('/captain',captainRoutes);
app.use('/maps',MapRoutes);
app.use('/rides',RideRoutes);

app.get("/",(req,res)=>{
    res.send("hello");
})


module.exports=app;