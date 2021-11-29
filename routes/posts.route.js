const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', (req, res) => { //GetAllUsers
    userController.getAllUsers(req, res);
})

module.exports = router;