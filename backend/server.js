// Create a basic express server
// =============================================================
const mongoose = require("mongoose")
const socketio = require("socket.io")

const dotenv = require("dotenv")
dotenv.config()

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection to Database is successful")
  })
  .catch((err) => {
    console.log("Unable to Connect to Database", err)
  })

const app = require("./app")

const portNo = process.env.PORT || 3000

const server = app.listen(portNo, () => {
  console.log(`App running on port ${portNo}...`)
})

const io = socketio(server)

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`)
  socket.on("new-message", (...data) => {
    console.log(data)
  })
  socket.on("join", (data) => {
    const { userId, username, roomId } = data
    socket.join(roomId)
    console.log(`User ${username} of ${userId} has joined the chat ${roomId}`)
    io.to(roomId).emit("info", {
      text: `User ${username} of ${userId} has joined the chat ${roomId}`,
    })
  })
  socket.on("new-message", (data) => {
    console.log("socket event of new message with data")
    console.log(data)
    socket.to(data.chatId).emit("new-message", data)
  })

  socket.on("logged-in", ({ userId }) => {
    console.log(`logged-in userId:${userId}`)
    socket.join(userId)
  })
  socket.on("new-chat", ({ userId }) => {
    console.log(`new-chat with user ${userId}`)
    socket.to(userId).emit("new-chat")
  })

  socket.on("disconnect", (data) => {
    console.log(`socket ${socket.id} disconnected`)
  })
})

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...")
  console.log(err)
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
