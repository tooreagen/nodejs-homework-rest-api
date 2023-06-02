const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../models/user-service");
const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const { SECRET_KEY } = process.env;

const userRegister = async (req, res, next) => {
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

const userLogin = async (req, res, next) => {
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

    await userService.userUpdate(userExist.id, { token: token });

    res.json({
      token: token,
      user: { email: userExist.email, subscription: userExist.subscription },
    });
  } catch (error) {
    return next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    const user = await userService.userFindById(req.user.id);

    if (!user) {
      next(HttpError(401));
    }

    await userService.userUpdate(req.user.id, { token: null });
    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

const userCurrent = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }

  try {
    const user = await userService.userFindByToken(token);

    if (!user) {
      next(HttpError(401));
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    return next(error);
  }
};

const userSubscriptionUpdate = async (req, res, next) => {
  const { subscription } = req.body;

  try {
    const user = await userService.userUpdate(req.user.id, {
      subscription: subscription,
    });

    if (!user) {
      next(HttpError(401));
    }

    res.json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userRegister: ctrlWrapper(userRegister),
  userLogin: ctrlWrapper(userLogin),
  userLogout: ctrlWrapper(userLogout),
  userCurrent: ctrlWrapper(userCurrent),
  userSubscriptionUpdate: ctrlWrapper(userSubscriptionUpdate),
};
