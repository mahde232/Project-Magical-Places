const commentModel = require('../models/comment.model').commentModel;

const getAllComments = (req, res) => {
    commentModel.find({}).populate('creator', 'firstName lastName').exec((err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getSpecificComment = (req, res) => {
    const { id } = req.params;
    commentModel.findById(id).populate('creator', 'firstName lastName').exec((err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'Comment does not exist!' });
        return res.status(200).json(data);
    })
}

const getMyComments = (req, res) => {
    commentModel.find({creator: {$eq: req.authenticatedUser._id}}).exec((err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const createComment = (req, res) => {
    const creator = req.authenticatedUser._id;
    const { post, text} = req.body;
    const comment = new commentModel({ creator, post, text, createdAt: new Date()})
    comment.save((err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        return res.status(200).json(data);
    })
}

const deleteComment = (req, res) => {
    const { id } = req.params;
    commentModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message); //error happened
        if (!data) return res.status(404).json({ message: 'Comment does not exist!' });
        return res.status(200).json({ message: `Comment with ID=${id} deleted successfully` });
    })
}

const updateComment = async (req, res) => { //only allow text to be edited
    const { id } = req.params;
    const { text } = req.body;
    const updatedPost = { text }
    commentModel.findByIdAndUpdate(id, updatedPost, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (!data) return res.status(404).json({ message: 'Comment not found' })
        return res.status(201).json(data);
    })
}

module.exports = {
    getAllComments,
    getSpecificComment,
    getMyComments,
    createComment,
    deleteComment,
    updateComment,
}