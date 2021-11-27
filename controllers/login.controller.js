const userModel = require('../models/user.model').userModel;
const jwt = require('jsonwebtoken');

const genAccessToken = (user) => {
    const userId = user.id;
    const role = user.role;
    const tokenPayload = { userId, role };
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET_KEY);
    return accessToken;
}

const handleLogin = async (req,res) => {
    console.log('loginController HandleLogin');
    const {email,password} = req.body;
    try {
        const user = await userModel.findByCredentials(email,password);
        return res.status(200).json(user)
    } catch(e) {
        return res.status(400).json({message: e.message})
    }
}

module.exports = {
    handleLogin,
}