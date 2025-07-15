const mongoose = require('mongoose');
const CSSubjectSchema = new mongoose.Schema({
    subject: {type: String, enum: ['OS', 'DBMS', 'CN', 'OOPS', 'DSA Theory'], required: true},
    topic: {type: String, required: true},
    notes: {type: String},
    status: {type: String, enum: ['Completed', 'Needs Revision'], default: 'Needs Revision'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});
module.exports = mongoose.model('CSSubject', CSSubjectSchema);