import { Action } from '@ngrx/store';
import { Actor, RegisterPayload } from '../models/actor';

export enum ActorActionTypes {
  Register = '[Actor] Register',
  Get = '[Actor] Get',
  GetActorsByPage = '[Actor] GetByPage',
  Update = '[Actor] Update',
  Delete = '[Actor] Delete'
}

export class Register implements Action {
  readonly type = ActorActionTypes.Register;
  constructor(public payload: { actor: Actor }) {}
}

export class Get implements Action {
  readonly type = ActorActionTypes.Get;
  constructor(public payload: any) {}
}

export class GetActorsByPage implements Action {
  readonly type = ActorActionTypes.GetActorsByPage;
  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = ActorActionTypes.Update;
  constructor(public payload: any) {}
}

export class Delete implements Action {
  readonly type = ActorActionTypes.Delete;
  constructor(public payload: any) {}
}

export type ActorActions =
  | Register
  | Get
  | Update
  | Delete;
