import { Action } from '@ngrx/store';
import { User, AuthenticatePayload, RegisterPayload } from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
  Authenticate = '[Auth] Authenticate',
  AuthenticateSuccess = '[Auth] Authenticate Success',
  AuthenticateFailure = '[Auth] Authenticate Failure',

  // Flag clear actions
  ClearRegisterFlag = '[Flag] Clear Register Flag',
  ClearLoggedInFlag = '[Flag] Clear Logged In Flag'
}

export class Authenticate implements Action {
  readonly type = AuthActionTypes.Authenticate;
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AuthenticateSuccess;
  constructor(public payload: { user: User }) {}
}

export class AuthenticateFailure implements Action {
  readonly type = AuthActionTypes.AuthenticateFailure;

  constructor(public payload: any) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: AuthenticatePayload) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: User }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;
  constructor(public payload: RegisterPayload) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;
  constructor(public payload: { user: User }) {}
}

export class RegisterFailure  implements Action {
  readonly type = AuthActionTypes.RegisterFailure;
  constructor(public payload: any) {}
}

export class ClearLoggedInFlag  implements Action {
  readonly type = AuthActionTypes.ClearLoggedInFlag;
}

export class ClearRegisterFlag  implements Action {
  readonly type = AuthActionTypes.ClearRegisterFlag;
}

export type AuthActions =
  | Authenticate
  | AuthenticateSuccess
  | AuthenticateFailure
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | Register
  | RegisterSuccess
  | RegisterFailure
  | ClearRegisterFlag
  | ClearLoggedInFlag;
