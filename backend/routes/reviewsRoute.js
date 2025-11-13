const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const authMiddleware = require("../middleware/authmidleware");

// ✅ Create a new review
router.post("/:productId", authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // // Check if user already reviewed
    // const alreadyReviewed = await Review.findOne({
    //   user: req.user.userId,
    //   product: productId,
    // });

    // if (alreadyReviewed)
    //   return res.status(400).json({ success: false, message: "You already reviewed this product" });

    // Create review
    const review = await Review.create({
      user: req.user.userId,
      product: productId,
      rating,
      comment,
    });

    // Optional: update product average rating
    const reviews = await Review.find({ product: productId });
    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    product.rating = avgRating;
    product.numReviews = reviews.length;
    await product.save();

    res.status(201).json({ success: true, review , avgReview: avgRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

// ✅ Get all reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort({ createdAt: -1 })
      .populate("user", "name"); // ✅ user field থেকে শুধু name নেবে

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ✅ Delete a review (user or admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review)
      return res.status(404).json({ success: false, message: "Review not found" });

    // Only owner or admin can delete
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin)
      return res.status(403).json({ success: false, message: "Not authorized" });

    await review.deleteOne();

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
