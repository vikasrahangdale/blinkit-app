const mongoose = require("mongoose");
const Joi = require('joi');

// Address Schema
const AddressSchema = mongoose.Schema({
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
});

// User Schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    phone: { type: Number,  },
    addresses: [AddressSchema],
    created_at: { type: Date, default: Date.now },
}, { timestamps: true });

const addressJoiSchema = Joi.object({
    state: Joi.string().required(),
    zip: Joi.number().integer().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
});

const userJoiSchema = Joi.object({
    name: Joi.string().min(3).required(), 
    email: Joi.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(), 
    password: Joi.string().min(6),
    phone: Joi.number().integer(),
    addresses: Joi.array().items(addressJoiSchema).required(),
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel,
    validateUser: (data) => userJoiSchema.validate(data),
};
