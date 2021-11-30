const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
        required: true
    }
});

tagSchema.methods.toJSON = function () { //hide unwanted information
    const tagObj = this.toObject()
    delete tagObj.__v
    return tagObj
}

const tagModel = mongoose.model('tags', tagSchema);

module.exports = {
    tagModel
}
