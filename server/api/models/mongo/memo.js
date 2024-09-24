const mongoose = require('mongoose');

const MemoSchema = new mongoose.Schema({
    content: { type: String },
    date: { type: String},
    createAt: { type: Date, default: Date.now, unique: true }
});

module.exports = mongoose.model('Memo', MemoSchema)