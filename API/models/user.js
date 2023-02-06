const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);