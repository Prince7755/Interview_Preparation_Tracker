const Behavioral = require("../models/Behavioral")

exports.createBehavioral = async (req, res) => {
    try{
        const newQ = new Behavioral({
            ...req.body,
            userId: req.user
        });
        await newQ.save();
        res.status(201).json(newQ);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getBehavioral = async (req, res) => {
    try{
        const questions = await Behavioral.find({userId: req.user});
        res.json(questions);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getBehavioralById = async (req, res) => {
    try{
        const question = await Behavioral.findOne({_id: req.params.id, userId: req.user});
        if(!question) return res.status(404).json({error: 'Not found'});
        res.json(question);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateBehavioral = async (req, res) => {
    try{
        const updated = await Behavioral.findOneAndUpdate(
            {_id: req.params.id, userId: req.user},
            req.body,
            { new: true}
        );
        if(!updated) return res.status(404).json({ error: 'Not found'});
        res.json(updated);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteBehavioral = async (req, res) => {
    try{
        const deleted = await Behavioral.findOneAndDelete({_id: req.params.id, userId: req.user});
        if(!deleted) return res.status(404).json({ error: 'Not found'});
        res.json({message: 'Deleted successfully'});
    }catch(err){
        res.status(500).json({err: err.message});
    }
};