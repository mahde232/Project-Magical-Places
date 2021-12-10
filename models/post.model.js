const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId, //userID
        required: true,
        ref: 'users',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, //categoryID
        required: true,
        ref: 'categories',
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
        type: Buffer
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId, //tagID
        ref: 'tags',
    }],
    region: {
        type: mongoose.Schema.Types.ObjectId, //regionID
        required: true,
        ref: 'regions',
    },
    location: { //GeoJSON implementation https://mongoosejs.com/docs/geojson.html
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

postSchema.virtual('comments', {
    ref: 'comments',
    localField: '_id',
    foreignField: 'post',
})

postSchema.methods.toJSON = function () { //hide unwanted information
    const postObj = this.toObject()
    delete postObj.__v
    return postObj
}

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });
const postModel = mongoose.model('posts', postSchema);

module.exports = {
    postModel
}
