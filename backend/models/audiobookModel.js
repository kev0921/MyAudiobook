const mongoose = require('mongoose');

const audiobookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  audioFilePath: {
    type: String,
  },
  audioText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Audiobook = mongoose.model('Audiobook', audiobookSchema);
module.exports = Audiobook;