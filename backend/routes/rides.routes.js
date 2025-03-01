const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const riderController=require('../controllers/ride.controller')
const authMiddleware=require('../middlewares/auth.middleware')

router.post('/create',authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage("inalid destination added"),
    body('vechileType').isString().isIn(['auto','motorcycle','car']).withMessage('invalid vehcileType'),
    riderController.createRide
    
 )


module.exports=router;
