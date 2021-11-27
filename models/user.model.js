const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Choose proper email')
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: false,
        }
    }]
});

userSchema.statics.findByCredentials = async (email, password) => {
    console.log('userModel findByCredentials');
    const user = await userModel.findOne({ email });
    if(!user) throw new Error('Unable to login, User not found')
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error('Unable to login, password is incorrect')
    return user;
}

// userSchema.pre('save', async function (next) { //not an arrow function cuz we need to bind this to the user being saved
//     const user = this;
//     if (user.isModified('password'))
//         user.password = await bcrypt.hash(user.password, 8)
//     next();
// })

const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel
}
