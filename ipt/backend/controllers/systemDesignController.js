const SystemDesign = require('../models/SystemDesign');

exports.createSystemDesign = async (req, res) => {
    try {
        const newTopic = new SystemDesign({
            ...req.body,
            userId: req.user  // ✅ updated
        });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSystemDesign = async (req, res) => {
    try {
        const topics = await SystemDesign.find({ userId: req.user }); // ✅ updated
        res.json(topics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSystemDesignById = async (req, res) => {
    try {
        const topic = await SystemDesign.findOne({ _id: req.params.id, userId: req.user }); // ✅ updated
        if (!topic) return res.status(404).json({ error: 'Not found' });
        res.json(topic);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSystemDesign = async (req, res) => {
    try {
        const updated = await SystemDesign.findOneAndUpdate(
            { _id: req.params.id, userId: req.user }, // ✅ updated
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSystemDesign = async (req, res) => {
    try {
        const deleted = await SystemDesign.findOneAndDelete({ _id: req.params.id, userId: req.user }); // ✅ updated
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
