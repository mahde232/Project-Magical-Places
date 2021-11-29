const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../express_middleware/auth')
const adminCheckUsers = require('../express_middleware/adminCheckUsers')
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
}).delete('/?id=:id', authMiddleware, adminCheckUsers, (req, res) => { //Delete using id (admin access)
    userController.deleteUser(req, res);
}).delete('/me', authMiddleware, (req, res) => { //Delete me
    userController.deleteMe(req, res);
}).put('/?id=:id', authMiddleware, adminCheckUsers, async (req, res) => { //Update whole user using id (admin access)
    await userController.updateUser(req, res);
}).put('/me', authMiddleware, async (req, res) => { //Update whole me
    await userController.updateMe(req, res);
})

module.exports = router;