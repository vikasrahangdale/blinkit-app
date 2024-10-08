const mongoose = require("mongoose");
const Joi = require('joi');

// Delivery Schema
const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    deliveryBoy: { type: String, required: true },
    status: { type: String, required: true },
    trackingUrl: { type: String, optional: true },
    estimatedDeliveryTime: { type: String, optional: true },
});

// Joi Validation
const deliveryJoiSchema = Joi.object({
    order: Joi.string().required(),
    deliveryBoy: Joi.string().required(),
    status: Joi.string().valid('pending', 'in_transit', 'delivered', 'cancelled').required(),
    trackingUrl: Joi.string().uri(),
    estimatedDeliveryTime: Joi.string().optional(),
});

// Export Model and Validation
const deliveryModel = mongoose.model("Delivery", deliverySchema);

module.exports = {
    deliveryModel,
    validateDelivery: (data) => deliveryJoiSchema.validate(data),
};
