const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      .json({ user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    return next(error);
  }
};

async function userLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const userExist = await userService.userFind(email);

    if (userExist === null) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const isMatchPassword = await bcrypt.compare(password, userExist.password);

    if (isMatchPassword === false) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = { id: userExist.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    await userService.userTokenUpdate(userExist.id, token);

    res.json({
      token: token,
      user: { email: userExist.email, subscription: userExist.subscription },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  userRegister: ctrlWrapper(userRegister),
  userLogin: ctrlWrapper(userLogin),
};
