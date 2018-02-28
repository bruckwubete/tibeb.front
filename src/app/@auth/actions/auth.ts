import { Action } from '@ngrx/store';
import { User, AuthenticatePayload, RegisterPayload } from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Register = '[Auth] Register',
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

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | Register;
