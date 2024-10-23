const mongoose = require('mongoose');

const audiobookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    audioText: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Audiobook', audiobookSchema);