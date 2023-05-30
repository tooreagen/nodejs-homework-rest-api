const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const userService = require("../models/user-service");
const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const { SECRET_KEY } = process.env;

const userRegister = async (req, res) => {
  const { email, password } = req.body;
  const newUser = {
    email: email,
    password: password,
  };

  try {
    const userExist = await userService.userFind(email);

    if (userExist !== null) {
      return res.status(409).json({ message: "Email in use" });
    }

    newUser.password = await bcrypt.hash(password, 10);
    const user = await userService.userRegister(newUser);
    res
      .status(201)
      .json({ user: { email: user.email, subscription: user.subscription }});
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userRegister: ctrlWrapper(userRegister),
};
