const express=require('express');
const router=express.Router();
const{body}=require('express-validator');
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middlewares/auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('inavlid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be atleats 3 characters'),
    body('password').isLength({min:6}).withMessage('passowrd mus be alteast 6 chracters')
],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters')
],userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);




module.exports=router;