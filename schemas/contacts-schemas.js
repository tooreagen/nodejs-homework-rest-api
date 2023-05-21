const joi = require("joi");

const contactSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(new RegExp(`^[a-z A-Z\s]+$`))
    .message("<name> only lowercase and uppercase letters and a space")
    .required(),
  email: joi
    .string()
    .email()
    .message("<email> E-mail should be in the format email@domain.name")
    .required(),
  phone: joi
    .string()
    .pattern(new RegExp(`^[0-9\s()+ -]{10,20}$`))
    .message("<phone> length from 10 to 20, may contain digits, spaces, () + -")
    .required(),
});

module.exports = {
  contactSchema,
};
