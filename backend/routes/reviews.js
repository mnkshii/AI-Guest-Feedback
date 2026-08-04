const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/reviewController");
const verifyToken = require("../middleware/authMiddleware");

// Protected Routes
router.get("/", verifyToken, controller.getReviews);
router.get("/stats", verifyToken, controller.getStats);
router.get("/:id", verifyToken, controller.getReview);
router.post(
  "/",
  verifyToken,
  (req,res,next)=>{
    console.log("BEFORE MULTER");
    next();
  },
  upload.array("images", 5),
  (req,res,next)=>{
    console.log("AFTER MULTER");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    next();
  },
  controller.createReview
);

router.put("/:id", verifyToken, controller.updateReview);

router.delete("/:id", verifyToken, controller.deleteReview);

module.exports = router;