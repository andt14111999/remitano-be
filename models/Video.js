const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoURL: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  title: {
    type: String,
  },
  embeddedURL: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  description: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
});

module.exports = mongoose.model('Video', videoSchema);
