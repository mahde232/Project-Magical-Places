const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
});
const postModel = mongoose.model('posts', postSchema);

module.exports = {
    postModel
}
