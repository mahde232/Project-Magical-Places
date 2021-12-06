const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId, //userID
        required: true,
        ref: 'users',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, //postID
        required: true,
        ref: 'posts',
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

commentSchema.methods.toJSON = function () { //hide unwanted information
    const commentObj = this.toObject()
    delete commentObj.__v
    return commentObj
}

const commentModel = mongoose.model('comments', commentSchema);

module.exports = {
    commentModel
}
