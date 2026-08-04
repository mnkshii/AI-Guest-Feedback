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
  (req, res, next) => {
    console.log("========== REVIEW UPLOAD DEBUG ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("==========================================");
    next();
  },
  controller.createReview
);


router.put("/:id", verifyToken, controller.updateReview);

router.delete("/:id", verifyToken, controller.deleteReview);


module.exports = router;