const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hotel-reviews",
    allowed_formats: ["jpg", "jpeg", "png", "webp","avif"],
    resource_type: "image",
  },
});


module.exports = multer({ storage });