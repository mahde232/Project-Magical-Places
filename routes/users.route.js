const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', (req, res) => { //GetAllUsers
    userController.getAllUsers(req, res);
}).get('/?id=:id', (req, res) => { //GetSpecificUser
    userController.getSpecificUser(req, res);
}).post('/', async (req, res) => { //CreateNewUser
    await userController.addNewUser(req, res);
}).delete('/?id=:id', (req, res) => { //Delete
    userController.deleteUser(req, res);
}).put('/?id=:id', async (req, res) => { //Update whole user
    await userController.updateUser(req, res);
})

module.exports = router;