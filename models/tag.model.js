const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
});
const tagModel = mongoose.model('tags', postSchema);

module.exports = {
    tagModel
}
