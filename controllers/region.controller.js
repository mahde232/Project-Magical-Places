const regionModel = require('../models/region.model').regionModel;

const getAllRegions = (req, res) => {
    regionModel.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data);
    })
}

const getRegionByID = (req, res) => {
    const { id } = req.params;
    regionModel.findById(id, (err, data) => {
        if (err) return res.status(404).json(err);
        if (!data) return res.status(404).json({ message: 'Region does not exist!' });
        return res.status(200).json(data);
    })
}

const createRegion = (req, res) => {
    const { name } = req.body;
    regionModel.findOne({ name }, async (err, data) => {
        if (err) return res.status(404).json({ message: err.message })
        if (!data) { //didn't find region
            const region = new regionModel({ name })
            region.save((err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                return res.status(200).json(data);
            })
        }
        else { return res.status(409).json({ message: 'Error, region exists!' }) }
    })
}

const deleteRegion = (req, res) => {
    const { id } = req.params;
    regionModel.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).json(err.message); //error happened
        if (!data) return res.status(404).json({ message: 'Region does not exist!' });
        return res.status(200).json({ message: `Region with ID=${id} deleted successfully` });
    })
}

const updateRegion = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRegion = { name }
    regionModel.findOne({ name }, (err, data) => {
        if (err) return res.status(404).json({ message: err.message });
        if (data && data._id.toString() !== id) return res.status(404).json({ message: 'region already exists' }) //check if such tag already exists
        else {
            regionModel.findByIdAndUpdate(id, updatedRegion, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).json({ message: err.message });
                if (!data) return res.status(404).json({ message: 'Region not found' })
                return res.status(201).json(data);
            })
        }
    })
}

module.exports = {
    getAllRegions,
    getRegionByID,
    createRegion,
    deleteRegion,
    updateRegion,
}