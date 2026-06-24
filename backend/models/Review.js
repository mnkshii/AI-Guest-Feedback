const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  guest: { type: String, required: true },
  date: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);