

require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/create.html");
});

app.use(express.static(__dirname));

const client = new MongoClient(process.env.MONGODB_URI);

let messagesCollection;

async function startServer() {
    try {
        await client.connect();

        const database = client.db("myPortfolio");
        messagesCollection = database.collection("messages");

        console.log("Connected to MongoDB successfully!");

        app.get("/api/status", (req, res) => {
            res.json({
                message: "My Portfolio backend is running!"
            });
        });

        app.post("/api/contact", async (req, res) => {
            try {
                const { name, email, message } = req.body;

                if (
                    typeof name !== "string" || !name.trim() ||
                    typeof email !== "string" || !email.trim() ||
                    typeof message !== "string" || !message.trim()
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Please fill in all fields."
                    });
                }

                await messagesCollection.insertOne({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                    createdAt: new Date()
                });

                res.json({
                    success: true,
                    message: "Your message was saved successfully!"
                });
            } catch (error) {
                console.error("Error saving message:", error.message);

                res.status(500).json({
                    success: false,
                    message: "Could not save your message."
                });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

        app.post("/api/feedback", async (req, res) => {
            console.log("Feedback request received:", req.body);
            try {
                const { name, rating, comments } = req.body;

                if (
                    typeof name !== "string" || !name.trim() ||
                    !Number.isInteger(rating) || rating < 1 || rating > 5 ||
                    typeof comments !== "string" || !comments.trim()
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Please provide a name, rating from 1 to 5, and comments."
                    });
                }

                const feedbackCollection = client
                    .db("myPortfolio")
                    .collection("feedback");

                await feedbackCollection.insertOne({
                    name: name.trim(),
                    rating,
                    comments: comments.trim(),
                    createdAt: new Date()
                });

                res.json({
                    success: true,
                    message: "Thank you! Your feedback was saved successfully."
                });
            } catch (error) {
                console.error("Error saving feedback:", error.message);

                res.status(500).json({
                    success: false,
                    message: "Could not save your feedback."
                });
            }
        });

    } catch (error) {
        console.error("Could not connect to MongoDB:", error.message);
        console.log("Check your .env connection string and Atlas settings.");
    }
}

startServer();