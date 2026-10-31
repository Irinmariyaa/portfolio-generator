
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: String,
    about: String,
    profileImage: String,
    email: String,
    phone: String,
    location: String,
    education: [mongoose.Schema.Types.Mixed],
    skills: [String],
    achievements: [String],
    hobbies: [String],
    projects: [mongoose.Schema.Types.Mixed]
}, {
    timestamps: true
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
