const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "JeweleryImgs", 
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

// Initialize multer
const upload = multer({ storage });

module.exports = upload;
