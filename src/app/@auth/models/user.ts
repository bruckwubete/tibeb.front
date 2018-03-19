export interface AuthenticatePayload {
  usernameEmail: string
  password: string
}

export interface RegisterPayload {
  firstName: String,
  lastName: String,
  confirmSuccessUrl?: String
  password: String
  passwordConfirmation: string
  profilePic?: File
  usernameEmail: string
  userType?: String
}

export interface User {
  firstName: String,
  lastName: String,
  value: any
}
