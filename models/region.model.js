const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

regionSchema.methods.toJSON = function () { //hide unwanted information
    const regionObj = this.toObject()
    delete regionObj.__v
    return regionObj
}

const regionModel = mongoose.model('regions', regionSchema);

module.exports = {
    regionModel
}
