"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvValidator = exports.idInventoryValidator = exports.createFeeValidato = exports.createInvValidato = exports.celebrateCheckPass = exports.userLoginValidator = exports.userRegisterValidator = void 0;
const celebrate_1 = require("celebrate");
const userRegisterValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        name_user: celebrate_1.Joi.string().min(4).required(),
        email_user: celebrate_1.Joi.string().email().required(),
        password_user: celebrate_1.Joi.string().min(4).max(20).required(),
    }),
};
exports.userRegisterValidator = userRegisterValidator;
const userLoginValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email_user: celebrate_1.Joi.string().email().required(),
        password_user: celebrate_1.Joi.string().min(4).max(20).required(),
    }),
};
exports.userLoginValidator = userLoginValidator;
const celebrateCheckPass = {
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        code: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().min(4).max(20).required(),
    }),
}; //quita futuro
exports.celebrateCheckPass = celebrateCheckPass;
const createInvValidato = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        description: celebrate_1.Joi.string(),
        totalPrice: celebrate_1.Joi.number().required(),
        neighborhood: celebrate_1.Joi.string(),
        date: celebrate_1.Joi.string().allow(null),
        payment_end_day: celebrate_1.Joi.string().required(),
    }),
};
exports.createInvValidato = createInvValidato;
const createFeeValidato = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        inventory: celebrate_1.Joi.string().required(),
        amount: celebrate_1.Joi.number().required(),
        date: celebrate_1.Joi.string(),
    }),
};
exports.createFeeValidato = createFeeValidato;
const idInventoryValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        id: celebrate_1.Joi.string().required(),
    }),
};
exports.idInventoryValidator = idInventoryValidator;
const updateInvValidator = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        id: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string(),
        total_price: celebrate_1.Joi.number().required(),
        neighborhood: celebrate_1.Joi.string(),
        date: celebrate_1.Joi.string(),
        payment_end_day: celebrate_1.Joi.string().required(),
        pending_debt: celebrate_1.Joi.boolean().required(),
        iscomplete: celebrate_1.Joi.boolean().required(),
    }),
};
exports.updateInvValidator = updateInvValidator;
