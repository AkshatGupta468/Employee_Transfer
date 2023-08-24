const catchAsync = require("../utils/catchAsync")
const { chatModel: Chats } = require("../models/chatModel")
const { MessageModel: Message } = require("../models/messageModel")
exports.newMessage = catchAsync(async (req, res) => {
  let chat
  if (!req.body.chatId) {
    // chat = await Chats.findOne().elemMatch("participant", (elem) => {
    //   elem.in([req.body.sentTo, req.user._id])
    // })

    chat = await Chats.findOne()
      .where("participants")
      .all([req.body.sentTo, req.user._id])

    if (!chat) {
      chat = new Chats({
        createdBy: req.user._id,
        participants: [req.user._id, req.body.sentTo],
      })
    }
  } else
    chat = await Chats.findById(req.body.chatId)
      .where("participants")
      .equals(req.user._id)
  if (!chat) {
    //send Invalid chat ID error
    return res.status(400).send({
      status: "fail",
      message: "Invalid Chat ID",
    })
  }

  const newMessage = new Message({
    sender: req.user._id,
    content: req.body.content,
    chatId: chat._id,
  })

  chat.messages.push(newMessage._id)
  await newMessage.save()
  await chat.save()
  res.status(200).send({
    status: "success",
    data: {
      newMessageID: newMessage._id,
      chatId: chat._id,
    },
  })
})

exports.getChat = catchAsync(async (req, res) => {
  const chat = await Chats.findById(req.body.chatId).populate("messages")
  res.status(200).json({
    status: "success",
    data: {
      chat,
    },
  })
})

exports.getNewMessages = catchAsync(async (req, res) => {
  // const newMessages= await Chats.findOne({
  //     _id: req.body.chatId,
  //     'message.timestamp'
  // })
})
