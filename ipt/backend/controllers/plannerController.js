const Planner = require('../models/Planner');

exports.createTask = async (req, res) => {
    try{
        const newTask = new Planner({
            ...req.body,
            userId: req.user
        });
        await newTask.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.getTask = async (req, res) => {
    try{
        const tasks = await Planner.find({ userId: req.user});
        res.json(tasks);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getTaskById = async(req, res) => {
    try{
        const task = await Planner.findOne({_id: req.params.id, userId: req.user});
        if(!task) return res.status(404).json({ error: 'Not found'});
        res.json(task);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateTask = async (req, res) => {
    try{
        const updated = await Planner.findOneAndUpdate(
            {_id: req.params.id, userId: req.user},
            req.body,
            {new : true}
        );
        if(!updated) return res.status(404).json({error: 'Not found'});
        res.json(updated);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteTask = async (req, res) => {
    try{
        const deleted = await Planner.findOneAndDelete({_id: req.params.id, userId: req.user});
        if(!deleted) return res.status(404).json({error:'Not found'});
        res.json({message: 'Deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
