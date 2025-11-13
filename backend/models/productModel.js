// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    category: {
      type: String,
      enum: ["partywear", "saree", "cotton2pc", "cotton3pc", "kurti"],
      required: [true, "Please select a category"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Please add at least one image"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    sale: {
      type: Number
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    fabric: {
      type: String,
      required: [true, "Please enter fabric type"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
