const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model').userModel
const postModel = require('../models/post.model').postModel

const adminCheckPosts = async (req, res, next) => {
    try {
        const tokenFromCookie = req.cookies.token;
        // const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(tokenFromCookie, process.env.JWT_SECRET_KEY);
        const idOfRequestSender = decodedToken._id;
        const requestSenderUser = await userModel.findById(idOfRequestSender);
        const post = await postModel.findById(req.params.id)

        if(idOfRequestSender !== post.creator.toString())
            if(requestSenderUser.authority === 0) //if not admin, throw error
                throw new Error()
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Admin access required..." })
    }
}

module.exports = adminCheckPosts