const mongoose = require('mongoose');
const behavioralSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});
module.exports = mongoose.model('Behavioral', behavioralSchema);