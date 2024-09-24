const mongoose = require('mongoose');

const TodaySchema = new mongoose.Schema({
    name: {type: String, trim: true, unique: true},
    subject: { type: mongoose.Schema.Types.ObjectId },
    description: { type: String},
    reason: { type: String},
    target: Number,
    status: { type: Number, default: 0, unique: true},
    createAt: { type: Date, default: Date.now, unique: true},
    startTime: {type: String},
    updateTime: { type: Date },
});

TodaySchema.index({ reason: 'text' });


module.exports = mongoose.model('Today', TodaySchema);