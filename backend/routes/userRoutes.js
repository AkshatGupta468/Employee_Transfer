const express = require("express");
const userRouter = express.Router();

userRouter
  .route("/profile")
  .get(userController.getDetails)
  .patch(userController.updateMe);

module.exports = userRouter;
