const mongoose = require("mongoose");
const Joi = require('joi');

const orderSchema = mongoose.Schema({
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
    address: { type: String, required: true },
    status: { type: String, required: true },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery",
        required: true,
    },
});

const orderJoiSchema = Joi.object({
    user: Joi.string().required(), 
    products: Joi.string().required(), 
    totalprice: Joi.number().positive().required(),
    address: Joi.string().required(),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').required(), 
    payment: Joi.string().required(), 
    delivery: Joi.string().required(), 
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = {
    orderModel,
    validateOrder: (data) => orderJoiSchema.validate(data),
};
