const Product = require("../models/productModel")
const express = require("express")
const upload = require("../utility/multer")
const isAdmin = require("../middleware/isAdmin")
const mongoose = require("mongoose");


const router = express.Router()


// ---------------- Upload Single Product ----------------
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            price,
            sizes,
            colors,
            fabric,
            stock
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const image = req.file.path; // path from multer

        const newProduct = await Product.create({
            name,
            description,
            category,
            price,
            sizes: sizes ? sizes.split(",") : [], // convert comma-separated to array
            colors: colors ? colors.split(",") : [],
            fabric,
            stock,
            image
        });

        res.status(201).json({
            success: true,
            message: "Product uploaded successfully",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// get all products for user
router.get("/all", async (req, res) => {
    try {
        // Only show products that are available
        const products = await Product.find();

        res.status(200).json({
            success: true,
            products: products,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// // get all products for admin
// router.get("/", isAdmin, async (req, res) => {
//     try {
//         // Only show products that are available
//         const products = await Product.find();
//         res.status(200).json({
//             success: true,
//             products,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });


// get single product
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// edit product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      sizes,
      colors,
      fabric,
      stock,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.sizes = sizes ? sizes.split(",") : product.sizes;
    product.colors = colors ? colors.split(",") : product.colors;
    product.fabric = fabric || product.fabric;
    product.stock = stock || product.stock;

    // If a new image is uploaded
    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




module.exports = router