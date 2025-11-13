const express = require("express")
const User = require("../models/authModel")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


const generateToken = (user) => jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "7d" });


const router = express.Router()

// register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user),
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user),
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// admin login
router.post("/admin/login", async(req , res)=>{
    try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email }).select("+password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });
    if (admin.role !== "admin") return res.status(403).json({ message: "Access denied (not admin)" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token: generateToken(admin),
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

// forget password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false });

    // reset URL (frontend link)
    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    // nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const message = {
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h3>Hello ${user.name},</h3>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router
