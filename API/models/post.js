const mongoose = require('mongoose');
const { Schema, mongo} = require("mongoose");
const {stringify} = require("nodemon/lib/utils");

const postSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    textContent: { type: String, required: true },
    imageUrl: { type: String },
    userLikes: { type: [String], required: true, default: []},
    createdDate: { type: Date, required: true},
});

module.exports = mongoose.model('Post', postSchema);