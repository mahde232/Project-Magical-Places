const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../express_middleware/auth')
const adminCheck = require('../express_middleware/adminCheck')
const router = express.Router();

router.get('/', authMiddleware, (req, res) => { //GetAllUsers
    userController.getAllUsers(req, res);
}).get('/?id=:id', authMiddleware, (req, res) => { //GetSpecificUser
    userController.getSpecificUser(req, res);
}).get('/profile', authMiddleware, (req, res) => { //get auth'd user profile
    userController.myProfile(req, res);
}).post('/', async (req, res) => { //CreateNewUser doesn't require auth middleware
    await userController.addNewUser(req, res);
}).post('/login', async (req, res) => { //Login doesn't require auth middleware
    await userController.handleLogin(req, res);
}).post('/logout', authMiddleware, async (req, res) => { //Logout
    await userController.handleLogout(req, res);
}).post('/logoutAll', authMiddleware, async (req, res) => { //Logout
    await userController.handleLogoutAll(req, res);
}).delete('/?id=:id', authMiddleware, adminCheck, (req, res) => { //Delete
    userController.deleteUser(req, res);
}).put('/?id=:id', authMiddleware, adminCheck, async (req, res) => { //Update whole user
    await userController.updateUser(req, res);
})

module.exports = router;