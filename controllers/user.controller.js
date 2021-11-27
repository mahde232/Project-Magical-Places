const userModel = require('../models/user.model').userModel;
const bcrypt = require('bcryptjs')

const getAllUsers = (req, res) => {
    userModel.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getSpecificUser = (req, res) => {
    const { id } = req.params;
    userModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'User does not exist!' });
        return res.status(200).json(data);
    })
}

const addNewUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    userModel.find({ email: { $eq: email } }, async (err, data) => {
        if (err) return res.status(404).json({ message: err.message })
        if (data.length === 0) { //didn't find any users with that specific email, therefore user can be added
            const user = new userModel({ firstName, lastName, email, password: await (bcrypt.hash(password, 8)) })
            user.save((err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                return res.status(200).json(data);
            })
        }
        else {
            return res.status(409).json({ message: 'Error, email already in use!' })
        }
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

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const updatedUser = { firstName, lastName, email, password: password.length > 0 ? await bcrypt.hash(password, 8) : "" }

    userModel.findOne({email}, (err,data)=>{
        if(err) return res.status(404).json({ message: err.message });
        if(data && data._id.toString() !== id) return res.status(404).json({ message: 'email already in use' }) //check if someone else already has the email address we want to change to
        else {
            userModel.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                if (!data) return res.status(404).json({ message: 'User not found' })
                return res.status(201).json(data);
            })
        }
    })
}

module.exports = {
    getAllUsers,
    getSpecificUser,
    addNewUser,
    deleteUser,
    updateUser,
}