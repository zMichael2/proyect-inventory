import { Joi, Segments } from "celebrate";

const userRegisterValidator = {
  [Segments.BODY]: Joi.object({
    name_user: Joi.string().min(4).required(),
    email_user: Joi.string().email().required(),
    password_user: Joi.string().min(4).max(20).required(),
  }),
};

const userLoginValidator = {
  [Segments.BODY]: Joi.object({
    email_user: Joi.string().email().required(),
    password_user: Joi.string().min(4).max(20).required(),
  }),
};

const celebrateCheckPass = {
  [Segments.PARAMS]: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
    password: Joi.string().min(4).max(20).required(),
  }),
}; //quita futuro

const createInvValidato = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    description: Joi.string(),
    totalPrice: Joi.number().required(),
    neighborhood: Joi.string(),
    date: Joi.string().allow(null),
    payment_end_day: Joi.string().required(),
  }),
};

const createFeeValidato = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    inventory: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.string(),
  }),
};

const idInventoryValidator = {
  [Segments.BODY]: Joi.object({
    id: Joi.string().required(),
  }),
};

const updateInvValidator = {
  [Segments.BODY]: Joi.object({
    id: Joi.string().required(),
    description: Joi.string(),
    total_price: Joi.number().required(),
    neighborhood: Joi.string(),
    date: Joi.string(),
    payment_end_day: Joi.string().required(),
    pending_debt: Joi.boolean().required(),
    iscomplete: Joi.boolean().required(),
  }),
};

export {
  userRegisterValidator,
  userLoginValidator,
  celebrateCheckPass,
  createInvValidato,
  createFeeValidato,
  idInventoryValidator,
  updateInvValidator,
};
