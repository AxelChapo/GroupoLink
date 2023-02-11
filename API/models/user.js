const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    department: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    posts: [{type: mongoose.Schema.Types.ObjectId,ref:'Post'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);