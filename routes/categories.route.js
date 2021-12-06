const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../express_middleware/auth');
const adminCheck = require('../express_middleware/adminCheck');
const router = express.Router();

//GET requests (no need for admin checks)
router.get('/', (req, res) => { //Get all categories
    categoryController.getAllCategories(req, res);
}).get('/id=:id', (req, res) => { //Get category by id
    categoryController.getCategoryByID(req, res);
})

//POST requests
router.post('/', authMiddleware, adminCheck, (req, res) => { //Create category
    categoryController.createCategory(req, res);
})

//DELETE requests
router.delete('/id=:id', authMiddleware, adminCheck, (req, res) => { //Delete category by id
    categoryController.deleteCategory(req, res);
})

//PUT requests
router.put('/id=:id', authMiddleware, adminCheck, (req, res) => { //Update category by id
    categoryController.updateCategory(req, res);
})

module.exports = router;