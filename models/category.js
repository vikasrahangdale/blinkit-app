const mongoose = require("mongoose");
const Joi = require('joi');

// Category Schema
const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
});

// Joi Validation
const categoryJoiSchema = Joi.object({
    name: Joi.string().required(),
});

// Export Model and Validation
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = {
    categoryModel,
    validateCategory: (data) => categoryJoiSchema.validate(data),
};
