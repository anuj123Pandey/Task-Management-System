const authMiddleware = require("../middleware/authmiddleware");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER API
router.post("/register", async (req, res) => {
    try {

        // 1. Get data from frontend
        const { name, email, password } = req.body;

        // 2. Check empty fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 3. Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // 4. Check whether user already exists
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // 5. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Save user in MongoDB
        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        // 7. Send response
        res.status(201).json({
            message: "Registration successful!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
});



// LOGIN API


router.post("/login", async (req, res) => {
    try {

        // 1. Get email and password
        const { email, password } = req.body;

        // 2. Check empty fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 3. Find user in MongoDB
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        
       
     // Generate JWT token 💖💖

     const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
      );

     // Send response
    res.status(200).json({
    message: "Login successful!",
    token: token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
    });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});




// PROTECTED PROFILE API


router.get("/profile", authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile accessed successfully!",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



module.exports = router;
