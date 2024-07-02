const { default: mongoose, Schema } = require("mongoose")

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Message cannot be empty"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: [true, "Sender Id cannot be empty"],
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chats",
      required: [true, "Chat Id cannot be empty"],
    },
  },
  {
    timestamps: true, //adds createdAt, updatedAt
  }
)

const MessageModel = mongoose.model("Message", MessageSchema)
module.exports = { MessageModel, MessageSchema }
