const tagModel = require('../models/tag.model').tagModel;

const getAllTags = (req, res) => {
    tagModel.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getTagByID = (req, res) => {
    const { id } = req.params;
    tagModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'Tag does not exist!' });
        return res.status(200).json(data);
    })
}

const createTag = (req, res) => {
    const { name, icon } = req.body;
    tagModel.findOne({ name }, async (err, data) => {
        if (err) return res.status(404).json({ message: err.message })
        if (!data) { //didn't find tag
            const tag = new tagModel({ name, icon })
            tag.save((err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                return res.status(200).json(data);
            })
        }
        else { return res.status(409).json({ message: 'Error, tag exists!' }) }
    })
}

const deleteTag = (req, res) => {
    const { id } = req.params;
    tagModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message); //error happened
        if (!data) return res.status(404).json({ message: 'Tag does not exist!' });
        return res.status(200).json({ message: `Tag with ID=${id} deleted successfully` });
    })
}

const updateTag = async (req, res) => {
    const { id } = req.params;
    const { name, icon } = req.body;
    const updatedTag = { name, icon }
    tagModel.findOne({ name }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (data && data._id.toString() !== id) return res.status(404).json({ message: 'tag already exists' }) //check if such tag already exists
        else {
            tagModel.findByIdAndUpdate(id, updatedTag, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                if (!data) return res.status(404).json({ message: 'Tag not found' })
                return res.status(201).json(data);
            })
        }
    })
}

module.exports = {
    getAllTags,
    getTagByID,
    createTag,
    deleteTag,
    updateTag,
}