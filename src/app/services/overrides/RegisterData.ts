export interface RegisterData {
  email: string;
  confirmSuccessUrl?: string;
  password: string;
  passwordConfirmation: string;
  name?: string;
  userType?: string;
  profilePic?: File
}