const mongoose = require("mongoose");
const Joi = require('joi');

// Admin Schema
const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

// Joi Validation
const adminJoiSchema = Joi.object({
    name: Joi.string().min(3).required(), // Minimum length for name
    email: Joi.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(), // Email with special character requirement
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
});

// Export Model and Validation
const adminModel = mongoose.model("Admin", adminSchema);

module.exports = {
    adminModel,
    validateAdmin: (data) => adminJoiSchema.validate(data),
};
