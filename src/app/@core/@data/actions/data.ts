import { Action } from '@ngrx/store';
import { Data, RegisterDataPayload } from '../models/data';

export enum DataActionTypes {
  Register = '[Data] Register',
  Get = '[Data] Get',
  QueryData = '[Data] QueryData',
  QueryDataDone = '[Data] QueryData  Done',
  Update = '[Data] Update',
  Delete = '[Data] Delete'
}

export class Register implements Action {
  readonly type = DataActionTypes.Register;
  constructor(public payload: { Data: RegisterDataPayload }, public model: String) {}
}

export class Get implements Action {
  readonly type = DataActionTypes.Get;
  constructor(public payload: Data, public model: String) {}
}

export class QueryData implements Action {
  readonly type = DataActionTypes.QueryData;
  constructor(public payload: String, public model: String) {}
}

export class QueryDataDone implements Action {
  readonly type = DataActionTypes.QueryDataDone;
  constructor(public payload: Array<Data>, public model: String) {}
}

export class Update implements Action {
  readonly type = DataActionTypes.Update;
  constructor(public payload: any, public model: String) {}
}

export class Delete implements Action {
  readonly type = DataActionTypes.Delete;
  constructor(public payload: any, public model: String) {}
}

export type DataActions =
  | Register
  | Get
  | Update
  | Delete
  | QueryData 
  | QueryDataDone;
