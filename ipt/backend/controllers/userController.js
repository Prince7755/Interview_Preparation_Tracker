const User = require('../models/User');
const Question = require('../models/Question');

const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const totalQuestions = await Question.countDocuments({ userId: req.user.id});

        res.json({
            email: user.email,
            totalQuestions,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = { getProfile };