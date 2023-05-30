const express = require("express");
const usersController = require("../../controllers/users-controller");
const userApiSchema = require("../../schemas/user-api-schema");
const { validateBody } = require("../../decorators/validateBody");

const router = express.Router();

router.post(
  "/register",
  validateBody(userApiSchema),
  usersController.userRegister
);

module.exports = router;
