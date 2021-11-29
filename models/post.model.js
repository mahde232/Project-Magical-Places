const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId, //userID
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId, //tagID
        required: false,
    }],
    location: { //GeoJSON implementation https://mongoosejs.com/docs/geojson.html
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
const postModel = mongoose.model('posts', postSchema);

module.exports = {
    postModel
}
