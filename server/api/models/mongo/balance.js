const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
    level: Number,
    exp_score: Number,
});

module.exports = mongoose.model('Balance', BalanceSchema);