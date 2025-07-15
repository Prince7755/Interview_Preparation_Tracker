const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    platform: String,
    difficulty: String,
    company: String,
    topic: String,
    date: {
        type: Date,
        default: Date.now
    },
    notes: String,
    status:{
        type: String,
        enum: ['Solved', 'Needs Revision', 'Revised'],
        default: 'Solved'
    },
    datePractised: {
        type: Date,
        default: Date.now
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Question', questionSchema);