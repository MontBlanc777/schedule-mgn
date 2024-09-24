const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    target_name: { type: String, trim: true, require: true},
    target_step: Number,
    target_cur_value: {type: Number, default: 0},
    target_value: { type: Number, require: true},
    target_subject: { type: mongoose.Schema.Types.ObjectId },
    status: {type: Number, default: 0, require: true},
    createAt: { type:Date, default: Date.now, unique: true},
    updateTime: { type:Date },
});

module.exports = mongoose.model('Subject', SubjectSchema);


// next.js 
// 1
// 1
// prodev

// JOwol func -------------