const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Cart items
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: String,
                image: String,
                price: Number,
                quantity: Number,
            },
        ],

        // Shipping / Delivery info
        shippingAddress: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            district: { type: String, required: true },
            subDistrict: { type: String, required: true },
            area: { type: String, required: true },
        },

        // Payment Info
        paymentMethod: {
            type: String,
            enum: ["Cash on Delivery", "bKash", "Nagad", "Rocket"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        transactionId: { type: String, default: null }, // optional for bKash/Stripe

        // Pricing Details
        itemsPrice: { type: Number, required: true }, // subtotal (all items total)
        deliveryFee: { type: Number, required: true, default: 60 },
        totalPrice: { type: Number, required: true }, // subtotal + delivery fee

        // Order Status
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },

        // Date fields
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
