const categoryModel = require('../models/category.model').categoryModel;

const getAllCategories = (req, res) => {
    categoryModel.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getCategoryByID = (req, res) => {
    const { id } = req.params;
    categoryModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'Category does not exist!' });
        return res.status(200).json(data);
    })
}

const createCategory = (req, res) => {
    const { name } = req.body;
    categoryModel.findOne({ name }, async (err, data) => {
        if (err) return res.status(404).json({ message: err.message })
        if (!data) { //didn't find category
            const category = new categoryModel({ name })
            category.save((err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                return res.status(201).json(data);
            })
        }
        else { return res.status(409).json({ message: 'Error, category exists!' }) }
    })
}

const deleteCategory = (req, res) => {
    const { id } = req.params;
    categoryModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message); //error happened
        if (!data) return res.status(404).json({ message: 'Tag does not exist!' });
        return res.status(200).json({ message: `Tag with ID=${id} deleted successfully` });
    })
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = { name }
    categoryModel.findOne({ name }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (data && data._id.toString() !== id) return res.status(404).json({ message: 'category already exists' })
        else {
            categoryModel.findByIdAndUpdate(id, updatedCategory, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                if (!data) return res.status(404).json({ message: 'Category not found' })
                return res.status(200).json(data);
            })
        }
    })
}

module.exports = {
    getAllCategories,
    getCategoryByID,
    createCategory,
    deleteCategory,
    updateCategory,
}