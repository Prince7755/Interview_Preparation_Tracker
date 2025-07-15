const mongoose = require('mongoose');
const mockInterviewSchema = new mongoose.Schema({
    date: {type: String, required: true},
    roundType: {type: String, required: true},
    company: {type: String, required: true},
    feedback: {type: String},
    rating: {type: Number, min: 1, max: 5},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});
module.exports = mongoose.model('MockInterview', mockInterviewSchema);