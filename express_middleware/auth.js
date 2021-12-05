const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model').userModel
const auth = async (req, res, next) => {
    try {
        const tokenFromCookie = req.cookies.token;
        // const tokenFromHeader = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(tokenFromCookie, process.env.JWT_SECRET_KEY);
        const user = await userModel.findOne({ 
            _id: decodedToken._id, 'tokens.token': tokenFromCookie 
        })
        if (!user) {
            throw new Error('No such user found!')
        }
        req.token = tokenFromCookie;
        req.authenticatedUser = user
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Authentication required..." })
    }
}

module.exports = auth