import { Action } from '@ngrx/store';
import { Actor, RegisterActorPayload } from '../models/actor';

export enum ActorActionTypes {
  Register = '[Actor] Register',
  Get = '[Actor] Get',
  QueryActors = '[Actor] QueryActors',
  QueryActorsDone = '[Actor] QueryActors  Done',
  Update = '[Actor] Update',
  Delete = '[Actor] Delete'
}

export class Register implements Action {
  readonly type = ActorActionTypes.Register;
  constructor(public payload: { actor: RegisterActorPayload }) {}
}

export class Get implements Action {
  readonly type = ActorActionTypes.Get;
  constructor(public payload: Actor) {}
}

export class QueryActors implements Action {
  readonly type = ActorActionTypes.QueryActors;
  constructor(public payload: String) {}
}

export class QueryActorsDone implements Action {
  readonly type = ActorActionTypes.QueryActorsDone;
  constructor(public payload: Array<Actor>) {}
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
  | Delete
  | QueryActors 
  | QueryActorsDone;
