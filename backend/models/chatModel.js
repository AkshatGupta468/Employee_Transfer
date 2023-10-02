const { default: mongoose, Schema } = require("mongoose")
const { MessageSchema } = require("./messageModel")
const chatSchema = new mongoose.Schema({
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  lastMessage: MessageSchema,
})

const chatModel = mongoose.model("Chat", chatSchema)

module.exports = { chatSchema, chatModel }
