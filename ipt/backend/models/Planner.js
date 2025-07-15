const mongoose = require('mongoose');
const plannerSchema = new mongoose.Schema({
    date: {type: String, required: true},
    task: { type: String, required: true},
    status: {type: String, enum: ['Pending', 'Completed'], default: 'Pending'},
    userId: {type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

module.exports = mongoose.model('Planner', plannerSchema);