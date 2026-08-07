const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/reviewController");
const verifyToken = require("../middleware/authMiddleware");

// Protected Routes

router.get("/", verifyToken, controller.getReviews);

router.get("/stats", verifyToken, controller.getStats);

router.get("/:id", verifyToken, controller.getReview);


// CREATE REVIEW WITH OPTIONAL IMAGES
router.post(
  "/",
  verifyToken,
  upload.array("images", 5),
  controller.createReview
);

router.put("/:id", verifyToken, controller.updateReview);

router.delete("/:id", verifyToken, controller.deleteReview);


module.exports = router;