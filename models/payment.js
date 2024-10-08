const mongoose = require("mongoose");
const Joi = require('joi');

// Payment Schema
const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel", 
        required: true,
    },
    amount: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true },
    transactionID: { type: String, required: true },
});

// Joi Validation
const paymentJoiSchema = Joi.object({
    order: Joi.string().required(), 
    amount: Joi.string().required(), 
    method: Joi.string().valid('credit_card', 'paypal', 'bank_transfer').required(), 
    status: Joi.string().valid('pending', 'completed', 'failed').required(), 
    transactionID: Joi.string().required(),
});

// Export Model and Validation
const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = {
    paymentModel,
    validatePayment: (data) => paymentJoiSchema.validate(data),
};
