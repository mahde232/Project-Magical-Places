const express = require('express');
const tagController = require('../controllers/tag.controller');
const authMiddleware = require('../express_middleware/auth');
const adminCheck = require('../express_middleware/adminCheck');
const router = express.Router();

//GET requests (no need for admin checks)
router.get('/', authMiddleware, (req, res) => { //Get all tags
    tagController.getAllTags(req, res);
}).get('/id=:id', authMiddleware, (req, res) => { //Get tag by id
    tagController.getTagByID(req, res);
})

//POST requests
router.post('/', authMiddleware, adminCheck, (req, res) => { //Create tag
    tagController.createTag(req, res);
})

//DELETE requests
router.delete('/id=:id', authMiddleware, adminCheck, (req, res) => { //Delete tag by id
    tagController.deleteTag(req, res);
})

//PUT requests
router.put('/id=:id', authMiddleware, adminCheck, (req, res) => { //Update tag by id
    tagController.updateTag(req, res);
})

module.exports = router;