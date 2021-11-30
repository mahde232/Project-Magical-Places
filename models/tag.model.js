const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});
const tagModel = mongoose.model('tags', tagSchema);

module.exports = {
    tagModel
}
