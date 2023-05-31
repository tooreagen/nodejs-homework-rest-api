const express = require("express");
const usersController = require("../../controllers/users-controller");
const userApiSchema = require("../../schemas/user-api-schema");
const { validateBody } = require("../../decorators/validateBody");
const authorization = require("../../middlewares/authorization")

const router = express.Router();

router.post(
  "/register",
  validateBody(userApiSchema),
  usersController.userRegister
);

router.post(
  "/login",
  validateBody(userApiSchema),
  usersController.userLogin
);

router.post(
  "/logout",
  authorization,
  usersController.userLogout
);

module.exports = router;
