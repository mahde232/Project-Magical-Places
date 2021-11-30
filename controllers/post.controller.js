const postModel = require('../models/post.model').postModel;

const getAllPosts = (req, res) => {
    postModel.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    }).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').exec((err,posts) => {
        console.log("exec");
    });
}

const getSpecificPost = (req, res) => {
    const { id } = req.params;
    postModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'Post does not exist!' });
        return res.status(200).json(data);
    }).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').exec((err,posts) => {
        console.log("exec");
    });
}

const getMyPosts = (req, res) => {
    postModel.find({id: {$eq: req.authenticatedUser._id}}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    }).populate('creator', 'firstName lastName email').populate('category', 'name').populate('tags', 'name icon').populate('region', 'name').exec((err,posts) => {
        console.log("exec");
    });
}

const createPost = (req, res) => {
    const creator = req.authenticatedUser._id;
    const { category, title, description, images, tags, region, location } = req.body;
    const post = new postModel({ creator, category, title, description, images, tags, region, location })
    post.save((err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        return res.status(200).json(data);
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
    const { creator, category, title, description, images, tags, region, location } = req.body;
    const updatedPost = { creator, category, title, description, images, tags, region, location }
    userModel.findByIdAndUpdate(id, updatedPost, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (!data) return res.status(404).json({ message: 'Post not found' })
        return res.status(201).json(data);
    })
}

module.exports = {
    getAllPosts,
    getSpecificPost,
    getMyPosts,
    createPost,
    deletePost,
    updatePost,
}