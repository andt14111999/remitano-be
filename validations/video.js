const Joi = require('joi');

const youtubeValidator = (data) => {
  const rule = Joi.object({
    videoURL: Joi.string().required().email(),
  });

  return rule.validate(data);
};

module.exports.youtubeValidator = youtubeValidator;
