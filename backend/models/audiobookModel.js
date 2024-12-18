const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const audiobookSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
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