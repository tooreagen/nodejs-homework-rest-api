const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPwd = joi.extend(joiPasswordExtendCore);

const userApiSchema = joi.object({
  email: joi
    .string()
    .email()
    .message("<email> E-mail should be in the format email@domain.name")
    .required(),
  password: joiPwd
    .string()
    .minOfSpecialCharacters(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required(),
});

module.exports = userApiSchema;
