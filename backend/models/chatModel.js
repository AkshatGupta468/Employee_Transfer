const { default: mongoose, Schema } = require("mongoose")

const chatSchema = mongoose.Schema({
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
})

const chatModel = mongoose.model("Chat", chatSchema)

module.exports = { chatSchema, chatModel }
