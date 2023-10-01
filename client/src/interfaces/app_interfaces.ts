export type RootStackParamList = {
  MessagingScreen: { chat: Chat }
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  WithinAppNavigator: undefined
  ChangePassword: undefined
  ProfileFormScreen: undefined
  ProfilePictureScreen: undefined
}

export interface Message {
  id: String
  content: String
  sender: String
  chatId: String
  timestamp: String
}

export interface User {
  id: string
  __v?: number
  email: string
  location?: string
  name?: string
  phone_number?: string
  photo?: string
  role?: string
  passwordResetExpires?: string
  passwordResetToken?: string
}

export interface Chat {
  id?: String
  title: String | undefined
  messages?: [Message]
  participants: [User]
  createdBy: User
}
