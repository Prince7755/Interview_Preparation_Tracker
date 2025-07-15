const MockInterview = require('../models/MockInterview');

exports.createMockInterview = async (req, res) => {
    try{
        const newMock = new MockInterview({
            ...req.body,
            userId: req.user
        });
        await newMock.save();
        res.status(201).json(newMock);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.getMockInterview = async(req, res) => {
    try{
        const mocks = await MockInterview.find({ userId: req.user});
        res.json(mocks);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getMockInterviewById = async (req, res) => {
    try{
        const mock = await MockInterview.findOne({_id: req.params.id, userId: req.user});
        if(!mock) return res.status(404).json({error: 'Not found'});
        res.json(mock);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateMockInterview = async (req, res) => {
    try{
        const updated = await MockInterview.findOneAndUpdate(
            {_id: req.params.id, userId: req.user},
            req.body,
            {new: true}
        );
        if(!updated) return res.status(404).json({ error: 'Not found'});
        res.json(updated);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.deleteMockInterview = async (req, res) => {
    try{
        const deleted = await MockInterview.findOneAndDelete({_id: req.params.id, userId: req.user});
        if(!deleted) return res.status(404).json({error: 'Not found'});
        res.json({message: 'Deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

