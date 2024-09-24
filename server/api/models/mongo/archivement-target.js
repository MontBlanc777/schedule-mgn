const mongoose = require('mongoose');

const ArchivementTarget = new mongoose.Schema({
    target: { type: String, trim: true, require: true},
    description: String,
    createAt: {type: Date, default: Date.now, unique: true},
});

module.exports = mongoose.model('ArchivementTarget', ArchivementTarget);

// conglrattion

//subject 100% / find length 
