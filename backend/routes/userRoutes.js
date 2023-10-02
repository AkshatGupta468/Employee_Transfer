const express = require("express")
const multer = require("multer")
const userController = require("./../controllers/userController")
const authController = require("./../controllers/authController")
const chatController = require("./../controllers/chatController")

const userRouter = express.Router()
userRouter.post("/signup", authController.signup)
userRouter.post("/login", authController.login)
userRouter.post("/forgotPassword", authController.forgotPassword)
userRouter.patch("/resetPassword/:token", authController.resetPassword)

userRouter.use(authController.protect)
// Protected Routes
userRouter
  .route("/allUsers")
  .get(authController.restrictTo("admin"), userController.getAllUsers)

userRouter
  .route("/profile")
  .get(userController.getDetails)
  .patch(userController.uploadUserPhoto, userController.updateMe)

userRouter.patch("/updatePassword", authController.updatePassword)

userRouter.use(userController.userInformationValidator)

userRouter.route("/employees").get(userController.getEmployees)

userRouter.route("/chat/:chatId").get(chatController.getChat)
userRouter.route("/chat").get(chatController.getAllChatsOfUser)

userRouter.route("/message/:chatId/:messageId").get(chatController.getMessage)
userRouter.route("/message").post(chatController.newMessage)
module.exports = userRouter
