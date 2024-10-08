const mongoose = require("mongoose");
const Joi = require('joi');

// Cart Schema
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
        required: true,
    },
    totalprice: { type: Number, required: true }, 
});

// Joi Validation
const cartJoiSchema = Joi.object({
    user: Joi.string().required(), 
    products: Joi.string().required(), 
    totalprice: Joi.number().positive().required(), 
});

// Export Model and Validation
const cartModel = mongoose.model("Cart", cartSchema);

module.exports = {
    cartModel,
    validateCart: (data) => cartJoiSchema.validate(data),
};
