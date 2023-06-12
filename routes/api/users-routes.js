const express = require("express");
const usersController = require("../../controllers/users-controller");
const {userApiSchema, userEmailSchema} = require("../../schemas/user-api-schema");
const { validateBody } = require("../../decorators/validateBody");
const authorization = require("../../middlewares/authorization")
const upload = require("../../middlewares/upload");

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

router.get(
  "/current",
  authorization,
  usersController.userCurrent
);

router.patch(
  "/",
  authorization,
  usersController.userSubscriptionUpdate
);

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  usersController.userAvatarUpdate
);

router.get(
  "/verify/:verificationToken",
  usersController.userVerification
);

router.post(
  "/verify",
  validateBody(userEmailSchema),
  usersController.userEmailResend
);
module.exports = router;
