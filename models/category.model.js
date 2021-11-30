const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

categorySchema.methods.toJSON = function () { //hide unwanted information
    const categoryObj = this.toObject()
    delete categoryObj.__v
    return categoryObj
}

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = {
    categoryModel
}
