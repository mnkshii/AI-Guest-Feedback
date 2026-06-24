const reviewData = require('../data/reviews');

exports.getReviews = (req, res) => {
  const { q } = req.query;
  const data = q ? reviewData.search(q) : reviewData.getAll();
  res.json(data);
};

exports.getReview = (req, res) => {
  const id = parseInt(req.params.id);
  const review = reviewData.getById(id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};

exports.createReview = (req, res) => {
  const { guest, date, rating, comment, sentiment } = req.body;
  if (!guest || !comment || rating === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newReview = reviewData.create({
    guest,
    date: date || new Date().toISOString().split('T')[0],
    rating,
    comment,
    sentiment: sentiment || 'neutral'
  });
  res.status(201).json(newReview);
};

exports.updateReview = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = reviewData.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Review not found' });
  res.json(updated);
};

exports.deleteReview = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = reviewData.remove(id);
  if (!deleted) return res.status(404).json({ message: 'Review not found' });
  res.status(204).send();
};

exports.getStats = (req, res) => {
  const all = reviewData.getAll();
  const total = all.length;
  const positive = all.filter(r => r.sentiment === 'positive').length;
  const neutral = all.filter(r => r.sentiment === 'neutral').length;
  const negative = all.filter(r => r.sentiment === 'negative').length;
  const avgRating = total > 0 ? (all.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : 0;
  res.json({ total, positive, neutral, negative, avgRating: parseFloat(avgRating) });
};