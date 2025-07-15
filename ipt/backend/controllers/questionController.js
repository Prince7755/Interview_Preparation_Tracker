const Question = require('../models/Question');

exports.addQuestion = async (req, res) => {
    const {title, platform, difficulty, company,topic, notes, status, timeTaken} = req.body;

    try{
        const question = new Question({
            title,
            platform,
            difficulty,
            company,
            topic,
            notes,
            status,
            timeTaken,
            userId: req.user
        });

        await question.save();
        res.status(201).json(question);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getQuestions = async (req, res) => {
    try{
        const questions = await Question.find({userId: req.user});
        res.json(questions);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.getQuestionById = async (req, res) => {
    const { id } = req.params;

    try{
        const question = await Question.findById(id);
        if(!question){
            return res.status(404).json({message: 'Question not found'});
        }
        res.json(question);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.updateQuestion = async(req, res) => {
    const { id } = req.params;
    const {title, platform, difficulty, company,topic, notes, status, timeTaken} = req.body;

    try{
        const question = await Question.findByIdAndUpdate(
            id,
            { title, platform, difficulty, company,topic, notes, status, timeTaken},
            {new: true}
        );
        res.json(question);
    }catch(err){
        res.send(500).json({message: err.message});
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try{
        await Question.findByIdAndDelete(id);
        res.json({message: 'Question deleted'});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};