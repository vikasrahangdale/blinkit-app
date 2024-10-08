const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const Joi = require('joi');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Boolean, required: true },
    description: { type: String },
    image: { type: String },
    created_at: { type: Date, default: Date.now },
}, { timestamps: true });

const productJoiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(), // Ensure price is positive
    category: Joi.string().required(),
    stock: Joi.boolean().required(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
});

const productModel = mongoose.model("Product", productSchema);

module.exports = {
    productModel,
    validateProduct: (data) => productJoiSchema.validate(data),
};
