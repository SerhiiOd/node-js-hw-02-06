const express = require("express");
const controller = require("../../controlers/auth");
const {
  validateBody,
  authenticate,
  upload,
  validateSubscription,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controller.register
);
router.get("/verify/:verificationToken", controller.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailShema),
  controller.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), controller.login);

router.get("/current", authenticate, controller.current);

router.post("/logout", authenticate, controller.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controller.updateAvatar
);

router.patch(
  "/:userId/subscription",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  controller.updateSubscription
);

module.exports = router;
