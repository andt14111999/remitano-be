const Joi = require('joi');

const registerValidator = (data) => {
  const rule = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$'))
      .required(),
  });

  return rule.validate(data);
};

module.exports.registerValidator = registerValidator;
