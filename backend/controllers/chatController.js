const catchAsync = require("../utils/catchAsync")
const { chatModel: Chats } = require("../models/chatModel")
const { MessageModel: Message } = require("../models/messageModel")
const { UserModel } = require("../models/userModel")
const AppError = require("../utils/appError")
const { ObjectId } = require("mongoose").Types

exports.newMessage = catchAsync(async (req, res, next) => {
  const { sendTo, chatId, content } = req.body
  const { user } = req

  let chat
  if (!chatId) {
    // chat = await Chats.findOne().elemMatch("participant", (elem) => {
    //   elem.in([sentTo, user._id])
    // })
    if (
      !sendTo ||
      !ObjectId.isValid(sendTo) ||
      !(await UserModel.findById(sendTo))
    ) {
      return next(
        new AppError(400, {
          sendTo: {
            name: "INVALID_MESSAGE_PARAMS",
            message: "sendTo Id is missing or chatId is missing",
          },
        })
      )
    }

    chat = await Chats.findOne().where("participants").all([sendTo, user._id])
    console.log(chat)
    if (!chat) {
      console.log("Chat doesn't Exists")
      chat = new Chats({
        createdBy: user._id,
        participants: [user._id, sendTo],
      })
    }
  } else {
    chat = await Chats.findById(chatId).where("participants").in(user._id)
  }

  if (!chat) {
    //send Invalid chat ID error
    return next(
      new AppError(400, {
        chatId: {
          name: "INVALID",
          message: "Invalid Chat ID",
        },
      })
    )
  }

  const newMessage = new Message({
    sender: user._id,
    content: content,
    chatId: chat._id,
  })

  chat.lastMessage = newMessage
  chat.messages.push(newMessage._id)
  await newMessage.save()
  await chat.save()
  return res.status(200).send({
    status: "success",
    data: {
      newMessageId: newMessage._id,
      chatId: chat._id,
    },
  })
})

exports.getAllChatsOfUser = catchAsync(async (req, res, next) => {
  let chats = await Chats.find()
    .where("participants")
    .in([req.user._id])
    .populate("participants")

  chats = chats.map((chat) => {
    if (chat.title) return chat.title
    for (let i = 0; i < chat.participants.length; i++) {
      if (chat.participants[i]._id.toString() != req.user._id.toString()) {
        chat.title = chat.participants[i].name
        break
      }
    }
    if (!chat.title) chat.title = chat._id
    return chat
  })

  res.status(200).json({
    status: "success",
    data: {
      chats,
    },
  })
})

exports.getChat = catchAsync(async (req, res, next) => {
  let chat
  if (req.params.chatId) {
    chat = await Chats.findById(req.params.chatId)
      .where("participants")
      .all([req.user._id])
      .populate("messages")
      .populate("participants")
  } else if (req.params.sendTo) {
    chat = await Chats.findOne()
      .where("participants")
      .all([req.user._id, req.params.sendTo])
      .populate("messages")
      .populate("participants")
  }
  if (!chat) {
    return new AppError(400, {
      misc: {
        name: "INVALID",
        message: "chatId or sendTo Required",
      },
    })
  }
  if (!chat.title) {
    for (let i = 0; i < chat.participants.length; i++) {
      if (chat.participants[i]._id.toString() != req.user._id.toString()) {
        chat.title = chat.participants[i].name
        break
      }
    }
  }

  if (!chat.title) chat.title = chat._id

  res.status(200).json({
    status: "success",
    data: {
      chat,
    },
  })
})

exports.getMessage = catchAsync(async (req, res, next) => {
  if (!req.params.messageId) {
    return next(
      new AppError(400, {
        messageId: {
          name: "REQUIRED",
          message: "message Id is required",
        },
      })
    )
  }
  if (!req.params.chatId) {
    return next(
      new AppError(400, {
        chatId: {
          name: "REQUIRED",
          message: "message Id is required",
        },
      })
    )
  }
  const { messageId, chatId } = req.params
  const chat = await Chats.findById(chatId)
    .where("participants")
    .equals(req.user._id)
  if (!chat) {
    return next(
      new AppError(400, {
        chatId: {
          name: "INVALID",
          message: "Invalid ChatId",
        },
      })
    )
  }
  const message = await Message.findOne({
    _id: messageId,
    chatId: chat._id,
  })
  return res.status(200).json({
    status: "success",
    data: {
      message,
    },
  })
})
