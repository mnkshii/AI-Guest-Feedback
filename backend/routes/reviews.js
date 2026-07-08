const express = require("express");
const router = express.Router();

const controller = require("../controllers/reviewController");
const verifyToken = require("../middleware/authMiddleware");

// Protected Routes
router.get("/", verifyToken, controller.getReviews);
router.get("/stats", verifyToken, controller.getStats);
router.get("/:id", verifyToken, controller.getReview);

router.post("/", verifyToken, controller.createReview);

router.put("/:id", verifyToken, controller.updateReview);

router.delete("/:id", verifyToken, controller.deleteReview);

module.exports = router;