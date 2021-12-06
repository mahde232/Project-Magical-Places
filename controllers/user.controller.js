const userModel = require('../models/user.model').userModel;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const getAllUsers = (req, res) => {
    userModel.find({}).populate('posts').populate('comments').exec((err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getSpecificUser = (req, res) => {
    const { id } = req.params;
    userModel.findById(id).populate('posts').populate('comments').exec((err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'User does not exist!' });
        return res.status(200).json(data);
    })
}

const addNewUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    userModel.findOne({ email: { $eq: email } }, async (err, data) => {
        if (err) return res.status(404).json({ message: err.message })
        if (!data) { //didn't find any users with that specific email, therefore user can be added
            const user = new userModel({ firstName, lastName, email, password: await (bcrypt.hash(password, 8)) })
            user.save((err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                return res.status(200).json(data);
            })
        }
        else { return res.status(409).json({ message: 'Error, email already in use!' }) }
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    userModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message); //error happened
        if (!data) return res.status(404).json({ message: 'User does not exist!' });
        return res.status(200).json({ message: `User with ID=${id} deleted successfully` });
    })
}

const deleteMe = (req, res) => {
    const id = jwt.verify(req.token, process.env.JWT_SECRET_KEY)._id; //get id from token of authenticated user.
    req.params.id = id; //reuse already implemented function
    return deleteUser(req, res);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    let updatedUser = { firstName, lastName, email }
    if (password) {
        updatedUser['password'] = await bcrypt.hash(password, 8);
    }
    userModel.findOne({ email }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (data && data._id.toString() !== id) return res.status(404).json({ message: 'email already in use' }) //check if someone else already has the email address we want to change to
        else {
            userModel.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                if (!data) return res.status(404).json({ message: 'User not found' })
                return res.status(201).json(data);
            })
        }
    })
}

const updateMe = async (req, res) => {
    const id = jwt.verify(req.token, process.env.JWT_SECRET_KEY)._id; //get id from token of authenticated user.
    req.params.id = id; //reuse already implemented function
    return await updateUser(req, res); //body already has what's needed, no need to add
}

const myProfile = async (req, res) => {
    return res.status(200).json(req.authenticatedUser)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findByCredentials(email, password);
        const generatedToken = await user.generateJWT()
        const userToSend = user.toObject()
        delete userToSend.password
        delete userToSend.__v
        delete userToSend.authority
        delete userToSend.tokens

        res.cookie('token', generatedToken, { httpOnly: true })
        return res.status(200).json({ user: userToSend, token: generatedToken })
    } catch (e) { return res.status(400).json({ message: e.message }) }
}

const handleLogout = async (req, res) => {
    try {
        req.authenticatedUser.tokens = req.authenticatedUser.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.authenticatedUser.save();
        res.status(200).json({ message: "Logout successful" })
    } catch (e) { res.status(500).json({ message: `Error: ${e}` }) }
}

const handleLogoutAll = async (req, res) => {
    try {
        req.authenticatedUser.tokens = []
        await req.authenticatedUser.save();
        res.status(200).json({ message: "Logout-from-all successful" })
    } catch (e) { res.status(500).json({ message: `Error: ${e}` }) }
}

const authUsingToken = async (req, res) => {
    setTimeout(() => {
        return res.status(200).json({ user: req.authenticatedUser, token: req.token })
    }, 300);
    // return res.status(200).json({user: req.authenticatedUser, token: req.token}) 
}

module.exports = {
    getAllUsers,
    getSpecificUser,
    myProfile,
    addNewUser,
    deleteUser,
    deleteMe,
    updateUser,
    updateMe,
    handleLogin,
    handleLogout,
    handleLogoutAll,
    authUsingToken,
}