const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

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
            if (!validator.isEmail(value)) {
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
    }],
    authority: {
        type: Number, //0=user, 1=moderator, 2=admin
        required: true,
        default: 0,
    },
});

userSchema.virtual('posts', {
    ref: 'posts',
    localField: '_id',
    foreignField: 'creator',
})

userSchema.virtual('comments', {
    ref: 'comments',
    localField: '_id',
    foreignField: 'creator',
})

userSchema.methods.toJSON = function () { //hide unwanted information from user
    const userObj = this.toObject()

    delete userObj.password
    delete userObj.__v
    delete userObj.authority
    delete userObj.tokens
    delete userObj.id

    return userObj
}

userSchema.methods.generateJWT = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET_KEY)
        this.tokens = this.tokens.concat({ token })
        await this.save()
        return token;
    }
    catch (err) {
        console.log('Error occured in user.generateJWT, error: ');
        console.log(err);
        throw new Error('Error occured in user.generateJWT');
    }
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error('Unable to login, User not found')
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login, password is incorrect')
    return user;
}

// userSchema.pre('save', async function (next) { //not an arrow function cuz we need to bind this to the user being saved
//     const user = this;
//     if (user.isModified('password'))
//         user.password = await bcrypt.hash(user.password, 8)
//     next();
// })

userSchema.set('toObject',{virtuals: true});
userSchema.set('toJSON',{virtuals: true});
const userModel = mongoose.model('users', userSchema);

module.exports = {
    userModel
}
