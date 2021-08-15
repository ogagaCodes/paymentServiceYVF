const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.paymentSchema = Joi.object({
  customer_id: Joi.objectId().required(),
  order_id: Joi.string().required(),
  amount: Joi.number().positive().required(),
  product_id: Joi.string().required(),
});
