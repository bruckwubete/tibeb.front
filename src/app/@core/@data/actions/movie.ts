import { Action } from '@ngrx/store';
import { Movie, RegisterMoviePayload } from '../models/Movie';

export enum MovieActionTypes {
  Register = '[Movie] Register',
  Get = '[Movie] Get',
  QueryMovies = '[Movie] QueryMovies',
  QueryMoviesDone = '[Movie] QueryMovies  Done',
  Update = '[Movie] Update',
  Delete = '[Movie] Delete'
}

export class Register implements Action {
  readonly type = MovieActionTypes.Register;
  constructor(public payload: { Movie: RegisterMoviePayload }) {}
}

export class Get implements Action {
  readonly type = MovieActionTypes.Get;
  constructor(public payload: Movie) {}
}

export class QueryMovies implements Action {
  readonly type = MovieActionTypes.QueryMovies;
  constructor(public payload: String) {}
}

export class QueryMoviesDone implements Action {
  readonly type = MovieActionTypes.QueryMoviesDone;
  constructor(public payload: Array<Movie>) {}
}

export class Update implements Action {
  readonly type = MovieActionTypes.Update;
  constructor(public payload: any) {}
}

export class Delete implements Action {
  readonly type = MovieActionTypes.Delete;
  constructor(public payload: any) {}
}

export type MovieActions =
  | Register
  | Get
  | Update
  | Delete
  | QueryMovies 
  | QueryMoviesDone;
