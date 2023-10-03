import { SOCKET_BASE_URL } from "@env"
import { io } from "socket.io-client"
export const NEW_MESSAGE = "new-message"
export const JOIN = "join"
export const INFO = "info"
export const LOGGED_IN = "logged-in"
export const NEW_CHAT = "new-chat"
const socket = io(SOCKET_BASE_URL)

export default socket
