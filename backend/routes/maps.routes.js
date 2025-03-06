const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware');
const mapService = require('../services/maps.services');

const mapController=require('../controllers/maps.controller')
const {query}=require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),authMiddleware.authUser,mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

router.get('/get-suggestion',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);

router.post('/fix-captain-locations', async (req, res) => {
    try {
        await mapService.fixCaptainLocations();
        res.json({ message: 'Captain locations updated successfully' });
    } catch (error) {
        console.error('Error fixing captain locations:', error);
        res.status(500).json({ message: 'Error updating captain locations' });
    }
});

module.exports=router;