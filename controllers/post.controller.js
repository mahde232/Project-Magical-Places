const postModel = require('../models/post.model').postModel;

const getAllPosts = (req, res) => {
    postModel.find({}).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').populate('comments', 'creator post text createdAt').exec((err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getSpecificPost = (req, res) => {
    const { id } = req.params;
    postModel.findById(id).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').populate('comments', 'creator post text createdAt').exec((err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'Post does not exist!' });
        return res.status(200).json(data);
    })
}

const getMyPosts = (req, res) => {
    postModel.find({ creator: { $eq: req.authenticatedUser._id } }).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').populate('comments', 'creator post text createdAt').exec((err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getPostsByCategory = (req, res) => {
    const { categoryID } = req.params
    postModel.find({ category: { $eq: categoryID } }).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').populate('comments', 'creator post text createdAt').exec((err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const createPost = (req, res) => {
    const creator = req.authenticatedUser._id;
    const images = req.files
    const post = new postModel({
        creator,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        region: req.body.region,
        location: req.body.location,
        images,
    })
    post.save((err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(404).json({ message: err.message });
        }
        return res.status(201).send(data);
    })
}

const addImagesToPost = (req, res) => {
    console.log('files=', req.files);
    postModel.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(404).json({ message: err.message });
        }
        if (data) {
            data.images = req.files.map(image => image.buffer);
            // data.images = req.files;
            data.save((error, saved) => {
                if (error) {
                    console.log(error.message);
                    return res.status(404).json({ message: error.message });
                }
                return res.status(201).send(saved);
            })
        }
    })
}

const deletePost = (req, res) => {
    const { id } = req.params;
    postModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message); //error happened
        if (!data) return res.status(404).json({ message: 'Post does not exist!' });
        return res.status(200).json({ message: `Post with ID=${id} deleted successfully` });
    })
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { category, title, description, images, tags, region, location } = req.body;
    const updatedPost = { category, title, description, images, tags, region, location }
    postModel.findByIdAndUpdate(id, updatedPost, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (!data) return res.status(404).json({ message: 'Post not found' })
        return res.status(200).json(data);
    })
}

module.exports = {
    getAllPosts,
    getSpecificPost,
    getMyPosts,
    createPost,
    deletePost,
    updatePost,
    addImagesToPost,
    getPostsByCategory,
}