const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model').userModel

const adminCheck = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const idOfRequestSender = decodedToken._id;
        const requestSenderUser = await userModel.findById(idOfRequestSender);

        if (!requestSenderUser || requestSenderUser.authority === 0) {
            throw new Error()
        }
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Admin access required..." })
    }
}

module.exports = adminCheck