
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Import database models
const Portfolio = require("./models/Portfolio");
const Feedback = require("./models/Feedback");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

// Test route
app.get("/api/status", (req, res) => {
    res.json({
        message: "Portfolio server is running!"
    });
});

// Save portfolio details
app.post("/api/portfolios", async (req, res) => {
    try {
        const portfolio = new Portfolio(req.body);
        await portfolio.save();

        res.status(201).json({
            message: "Portfolio saved successfully!",
            portfolio
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to save portfolio",
            error: error.message
        });
    }
});

// Get a portfolio using its ID
app.get("/api/portfolios/:id", async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({
                message: "Portfolio not found"
            });
        }

        res.json(portfolio);
    } catch (error) {
        res.status(400).json({
            message: "Invalid portfolio ID"
        });
    }
});

// Save feedback
app.post("/api/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully!",
            feedback
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to save feedback",
            error: error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
});
