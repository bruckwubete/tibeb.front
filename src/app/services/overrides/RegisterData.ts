import {RegisterData} from 'ngx-token'
export interface RegisterData2 extends RegisterData {
  email: string;
  confirmSuccessUrl?: string;
  firstName: string;
  lastName: string;
  name?: string;
  password: string;
  passwordConfirmation: string;
  userType?: string;
  profilePic?: any;
  profile_pic?: any;
}