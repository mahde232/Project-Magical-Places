const express = require('express');
const regionController = require('../controllers/region.controller');
const authMiddleware = require('../express_middleware/auth');
const adminCheck = require('../express_middleware/adminCheck');
const router = express.Router();

//GET requests (no need for admin checks)
router.get('/', authMiddleware, (req, res) => { //Get all Regions
    regionController.getAllRegions(req, res);
}).get('/id=:id', authMiddleware, (req, res) => { //Get Region by id
    regionController.getRegionByID(req, res);
})

//POST requests
router.post('/', authMiddleware, adminCheck, (req, res) => { //Create Region
    regionController.createRegion(req, res);
})

//DELETE requests
router.delete('/id=:id', authMiddleware, adminCheck, (req, res) => { //Delete Region by id
    regionController.deleteRegion(req, res);
})

//PUT requests
router.put('/id=:id', authMiddleware, adminCheck, (req, res) => { //Update Region by id
    regionController.updateRegion(req, res);
})

module.exports = router;