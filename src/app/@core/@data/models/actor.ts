  export interface RegisterPayload extends Actor {

  }
  
  export interface Actor {
    firstName: String,
    lastName: String,
    fullName: String,
    bio: String,
    dob: any,
    phoneNumber: String,
    profilePics?: Array<File>,
    retired: Boolean,
    socialLinks: Array<SocialLinks>
  }

  interface SocialLinks {
      name: String,
      url: String
  }
  