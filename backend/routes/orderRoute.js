const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Product = require("../models/productModel")
const authMiddleware = require("../middleware/authmidleware");

//  Create new order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { orderItems, paymentMethod, deliveryFee, shippingAddress } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        // Recalculate subtotal (itemsPrice) from DB
        let itemsPrice = 0;

        for (const item of orderItems) {
            const product = await Product.findById(item.product); // product._id from frontend
            if (!product) throw new Error(`Product not found: ${item.product}`);

            itemsPrice += product.price * item.quantity;
        }

        const totalPrice = itemsPrice + (deliveryFee || 0); // total = items + delivery

        const order = new Order({
            user: req.user.userId,
            orderItems,
            itemsPrice,      // new field for subtotal
            totalPrice,      // total including delivery fee
            paymentMethod,
            deliveryFee,
            shippingAddress,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
});

//  Get all orders (Admin)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
});

//  Get single order by ID
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to get order", error: error.message });
    }
});

//  Update order status (Admin)
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.orderStatus = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error: error.message });
    }
});

//  Delete order (Admin)
router.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        await order.deleteOne();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
});

module.exports = router;
