import axios from "axios"
import { BACKEND_BASE_URL, SOCKET_BASE_URL } from "@env"
import socket, { JOIN, NEW_MESSAGE } from "./socket"
import { Chat, ChatThumb, Message, id } from "../interfaces/app_interfaces"
const api = axios.create({
  baseURL: BACKEND_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return error
  }
)

const sendMessage = async (
  body:
    | { sendTo: String; content: String }
    | { chatId: String; content: String }
): Promise<{ newMessageId: id; chatId: id }> => {
  return await api
    .post("message", body)
    .then((res) => {
      const messagedata = res.data.data
      socket.emit(NEW_MESSAGE, messagedata)
      return messagedata
    })
    .catch((err) => {
      return err.response.data
    })
}

const getMessage = async (
  newMessageId: String,
  chatId: String
): Promise<Message> => {
  return await api
    .get(`message/${chatId}/${newMessageId}`)
    .then((res) => {
      const message: Message = res?.data?.data?.message
      console.log(message)
      return message
    })
    .catch((err) => {
      if (err.response) return err.response.data
    })
}

const getAllChatsOfUser = async (): Promise<[ChatThumb]> => {
  console.log("Getting All Chats")
  return await api
    .get(`chat`)
    .then((res) => {
      const chatsThumbs: [ChatThumb] = res?.data?.data?.chats
      chatsThumbs.forEach((chatThumb) => {
        if (chatThumb._id) {
          socket.emit(JOIN, {
            userId: currentUser._id,
            username: currentUser.name,
            roomId: chatThumb._id,
          })
        }
      })
      return chatsThumbs
    })
    .catch((err) => {
      if (err.response) return err.response.data
    })
}

const getChat = async (chatId: id): Promise<Chat> => {
  return await api
    .get(`chat/${chatId}`)
    .then((res) => {
      const chat: Chat = res?.data.data.chat
      return chat
    })
    .catch((err) => {
      return err.response.data
    })
}

const getChatSendTo = async (sendTo: id): Promise<Chat> => {
  return await api
    .get(`chat/sendTo/${sendTo}`)
    .then((res) => {
      const chat: Chat = res?.data.data.chat
      return chat
    })
    .catch((err) => {
      return err.response.data
    })
}

export default {
  sendMessage,
  getMessage,
  getAllChatsOfUser,
  getChat,
  getChatSendTo,
}
