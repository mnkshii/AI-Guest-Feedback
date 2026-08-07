const Review = require("../models/Review");

// GET all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
    user: req.user.id,
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one review
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findOne({
  _id: req.params.id,
  user: req.user.id,
});

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE review
exports.createReview = async (req, res) => {
  try {

    console.log("CREATE REVIEW API HIT");
    console.log("Headers:", req.headers.authorization);
    console.log("Logged in user:", req.user);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const imageUrls = req.files?.map(
  (file) => file.secure_url || file.path
) || [];

console.log("IMAGE URLS:", imageUrls);

    const review = new Review({
    guest: req.body.guest,
    date: req.body.date || new Date().toISOString().split("T")[0],
    rating: Number(req.body.rating),
    comment: req.body.comment,
    images: imageUrls,
    sentiment: req.body.sentiment || "neutral",
    user: req.user.id,
  });

    const saved = await review.save();

    console.log("Saved review:", saved);

    res.status(201).json(saved);

  } 
catch (err) {
  console.error("========== CREATE REVIEW ERROR ==========");
  console.error(err);
  console.error(err.stack);
  
  res.status(500).json({
    message: err.message
  });
}
};

// UPDATE review
exports.updateReview = async (req, res) => {
  try {
    const updated = await Review.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user.id,
  },
  req.body,
  {
    new: true,
  }
);

    if (!updated) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json(updated);
  } catch (err) {
    console.error("UPDATE REVIEW ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE review
exports.deleteReview = async (req, res) => {
  try {
   const deleted = await Review.findOneAndDelete({
  _id: req.params.id,
  user: req.user.id,
});
    if (!deleted) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json({
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STATS
exports.getStats = async (req, res) => {
  try {
    const all = await Review.find({
  user: req.user.id,
});

    const total = all.length;

    const positive = all.filter(
      (r) => r.sentiment === "positive"
    ).length;

    const neutral = all.filter(
      (r) => r.sentiment === "neutral"
    ).length;

    const negative = all.filter(
      (r) => r.sentiment === "negative"
    ).length;

    const avgRating =
      total > 0
        ? (
            all.reduce(
              (sum, r) => sum + r.rating,
              0
            ) / total
          ).toFixed(1)
        : 0;

    res.json({
      total,
      positive,
      neutral,
      negative,
      avgRating: Number(avgRating),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};