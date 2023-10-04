export type RootStackParamList = {
  MessagingScreen: { chatThumb: ChatThumb }
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  WithinAppNavigator: undefined
  ChangePassword: undefined
  ProfileFormScreen: undefined
  ProfilePictureScreen: undefined
}

export interface Message {
  _id: id
  content: String
  sender: id
  chatId: id
  createdAt: string
  updatedAt: string
}

export type id = String
export interface Chat {
  _id?: id
  title: String
  messages?: [Message]
  participants: [id]
  createdBy: id
}

export interface ChatThumb {
  _id?: id
  title: String
  lastMessage?: Message
  participants: [id]
  createdBy: id
}
