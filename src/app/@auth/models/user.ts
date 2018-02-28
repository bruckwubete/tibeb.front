export interface AuthenticatePayload {
  usernameEmail: string
  password: string
}

export interface RegisterPayload {
  confirmSuccessUrl?: String
  password: String
  passwordConfirmation: string
  profilePic?: File
  usernameEmail: string
  userType?: String
}

export interface User {
  name: string
  value: any
}
