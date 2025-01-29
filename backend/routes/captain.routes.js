const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captain.controller');
const authMiddleware=require('../middlewares/auth.middleware');


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('lastname must be at least 3 characters long'),
    body('email').isEmail().withMessage('invalid email'),
    body('vechile.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vechile.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vechile.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vechile.vechileType').isIn(['car','motorcycle','auto']).withMessage('invalid vechile type'),
    body('password').isLength({min:8}).withMessage('password must be at least 8 characters long'),

],captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:8}).withMessage('password must be at least 8 characters long'),
],captainController.loginCaptain);


router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);


module.exports=router;