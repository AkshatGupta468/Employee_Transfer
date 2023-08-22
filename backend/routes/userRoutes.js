const express = require("express");
const multer = require("multer");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);

userRouter.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

userRouter
  .route("/profile")
  .get(authController.protect, userController.getDetails)
  .patch(authController.protect, userController.updateMe);

userRouter
  .route("/allUsers")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

module.exports = userRouter;
