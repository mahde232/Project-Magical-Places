const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model').userModel

const adminCheckUsers = async (req, res, next) => {
    try {
        const tokenFromCookie = req.cookies.token;
        // const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(tokenFromCookie, process.env.JWT_SECRET_KEY);
        const idOfRequestSender = decodedToken._id;
        const requestSenderUser = await userModel.findById(idOfRequestSender);

        if (!requestSenderUser) {
            throw new Error('No such user found!')
        }

        if(idOfRequestSender !== req.params.id) //user sending request isnt the one being deleted/updated
            if(requestSenderUser.authority === 0) //if not admin, throw error
                throw new Error()
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Admin access required..." })
    }
}

module.exports = adminCheckUsers