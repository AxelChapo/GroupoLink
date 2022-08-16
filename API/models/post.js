const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const postSchema = new Schema({
    userId: { type: Number, required: true },
    textContent: { type: String, required: true },
    imageUrl: { type: String },
    userLikes: { type: Number, required: true },
    createdDate: { type: Date, required: true},
});

module.exports = mongoose.model('Post', postSchema);