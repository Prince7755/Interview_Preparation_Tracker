const mongoose = require('mongoose');
const systemDesignSchema = new mongoose.Schema({
    title: {type:String, required: true},
    notes: {type: String},
    datePractised: {type: Date},
    status: {type: String, enum: ['Practised', 'Needs Revision'], dafault: 'Needs Revision'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('SystemDesign', systemDesignSchema);