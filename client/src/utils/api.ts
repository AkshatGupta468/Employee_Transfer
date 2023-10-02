import axios from "axios"
import { BACKEND_BASE_URL } from "@env"

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    console.log("interceptor, token : ", token)
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
) => {
  return await api
    .post("message", body)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

const getMessage = async (messageId: String, chatId: String) => {
  return await api
    .get(`message/${chatId}/${messageId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

const getAllChatsOfUser = async () => {
  console.log("Getting All Chats")
  return await api
    .get(`chat`)
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

const getChat = async (chatId: String) => {
  return await api
    .get(`chat/${chatId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err.response.data
    })
}

export default { sendMessage, getMessage, getAllChatsOfUser, getChat }
