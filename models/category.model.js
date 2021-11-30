const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});
const categoryModel = mongoose.model('categories', categorySchema);

module.exports = {
    categoryModel
}
