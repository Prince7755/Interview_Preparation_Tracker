const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try{
        const newProject = new Project({
            ...req.body,
            userId: req.user
        });
        await newProject.save();
        res.status(201).json(newProject);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getProject = async (req, res) => {
    try{
        const projects = await Project.find({ userId: req.user});
        res.json(projects);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.getProjectById = async (req, res) => {
    try{
        const project = await Project.findOne({_id: req.params.id, userId: req.user});
        if(!project) return res.status(404).json({ error: 'Not found'});
        res.json(project);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateProject = async (req, res) => {
    try{
        const updated = await Project.findOneAndUpdate(
            {_id: req.params.id, userId: req.user},
            req.body,
            {new: true}
        );
        if(!updated) return res.status(404).json({ error: 'Not Found'});
        res.json(updated);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteProject = async(req, res) => {
    try{
        const deleted = await Project.findOneAndDelete({_id: req.params.id, userId: req.user});
        if(!deleted) return res.status(404).json({ error: 'Not found'});
        res.json({message: 'Deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}