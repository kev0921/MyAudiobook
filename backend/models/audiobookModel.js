const mongoose = require('mongoose');

const audiobookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  audiobook_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  audioText: {
    type: String,
    required: true,
  },
});

const Audiobook = mongoose.model('Audiobook', audiobookSchema);
module.exports = Audiobook;