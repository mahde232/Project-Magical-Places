const express = require('express');
const loginController = require('../controllers/login.controller');
const router = express.Router();

router.post('/', async (req, res) => { //GetAllUsers
    console.log('loginRouterPostRequest')
    await loginController.handleLogin(req, res);
})

module.exports = router;