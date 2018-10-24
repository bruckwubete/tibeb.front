  import { Data } from './data'
  
  export interface RegisterActorPayload extends Actor {

  }

  export interface Person extends Data {
    id ?: String,
    firstName: String,
    lastName: String,
    fullName: String,
    bio: String,
    dob: Date,
    movieIds: Array<String>,
    phoneNumber: String,
    pictures?: Array<File>,
    videos?: Array<File>,
    retired: Boolean,
    socialLinks: Array<SocialLinks>
  }
  
  export interface Actor extends Person {
  }
  export interface Director extends Person {
  }
  export interface Crew extends Person {
  }

  interface SocialLinks {
      name: String,
      url: String
  }
  