const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);

userRouter
  .route("/profile")
  .get(authController.protect, userController.getDetails)
  .patch(authController.protect, userController.updateMe);

userRouter
  .route("/allUsers")
  .get(authController.protect, userController.getAllUsers);

module.exports = userRouter;
