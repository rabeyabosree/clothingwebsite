// backend/routes/wishlistRoute.js
const express = require("express");
const router = express.Router();
const Wishlist = require("../models/wishlistSchema");
const authMiddleware = require("../middleware/authmidleware"); 

// ------------------ Add Product to Wishlist ------------------
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required" });

    let wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    const populatedWishlist = await wishlist.populate("products");
    res.status(200).json({ success: true, products: populatedWishlist.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------ Get User Wishlist ------------------
router.get("/", authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.userId }).populate("products");
    if (!wishlist) return res.status(200).json({ success: true, products: [] });

    res.status(200).json({ success: true, products: wishlist.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------ Remove Product from Wishlist ------------------
router.post("/remove", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required" });

    const wishlist = await Wishlist.findOne({ user: req.user.userId });
    if (!wishlist) return res.status(404).json({ success: false, message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    await wishlist.save();

    const populatedWishlist = await wishlist.populate("products");
    res.status(200).json({ success: true, products: populatedWishlist.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
