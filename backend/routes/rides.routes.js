const express=require('express');
const router=express.Router();
const {body,query}=require('express-validator');
const riderController=require('../controllers/ride.controller')
const authMiddleware=require('../middlewares/auth.middleware')

router.post('/create',authMiddleware.authUser,
    body('Pickup').isString().isLength({min:3}).withMessage('invalid pickup address'),
    body('Destination').isString().isLength({min:3}).withMessage("inalid destination added"),
    body('vechileType').isString().isIn(['auto','motorcycle','car']).withMessage('invalid vehcileType'),
    riderController.createRide
    
)



router.get('/get-fare',
    authMiddleware.authUser,
    query('Pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    query('Destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    riderController.getFare
)

router.post('/confirm',authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    riderController.confirmRide
)

router.get('/start-ride',authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('invalid ride id'),query('otp').isString().isLength({ min: 4, max: 6 }).withMessage('Invalid OTP'),
    riderController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    riderController.endRide

)


module.exports=router;
