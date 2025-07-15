const CSSubject = require('../models/CSSubject');

exports.createCSSubject = async (req, res) => {
    try{
        const newTopic = new CSSubject({
            ...req.body,
            userId: req.user
        });
        await newTopic.save();
        res.status(201).json(newTopic);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getCSSubject = async(req, res) => {
    try{
        const topics = await CSSubject.find({userId: req.user});
        res.json(topics);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getCSSubjectById = async (req, res) => {
    try{
        const topic = await CSSubject.findOne({_id: req.params.id, userId: req.user});
        if(!topic) return res.status(404).json({error: 'Not found'});
        res.json(topic);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateCSSubject = async (req, res) => {
    try{
        const updated = await CSSubject.findOneAndUpdate(
            {_id: req.params.id, userId: req.user},
            req.body,
            {new: true}
        );
        if(!updated) return res.status(404).json({error: 'Not found'});
        res.json(updated);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteCSSubject = async (req, res) => {
    try{
        const deleted = await CSSubject.findOneAndDelete({_id: req.params.id, userId: req.user});
        if(!deleted) return res.status(404).json({error: 'Not found'});
        res.json({message: 'Deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};