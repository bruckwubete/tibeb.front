import { DataActionTypes, DataActions } from '../actions/data';
import { Data } from '../models/data';
import { Actor } from '../models/actor'
import { Movie } from '../models/movie'

export interface State {
  success: boolean,
  actors: Array<Actor>,
  movies: Array<Movie>,
  actor: Actor,
  movie: Movie
}

enum modelType { Actor, Data, Movie}


export const initialState: State = {
  success: false,
  actors: new Array<Actor>(),
  movies: new Array<Movie>(),
  movie: null,
  actor: null
};

export function reducer(state = initialState, action: DataActions): State {
  switch (action.type) {
    case DataActionTypes.Get || DataActionTypes.Update: {
      return {
        ...state,
        success: false
      };
    }

    case DataActionTypes.GetDone || DataActionTypes.UpdateDone: {
      switch(action.model.toLowerCase()) {
        case 'actors': {
          return {
              ...state,
              success: true,
              actor: action.payload as Actor
            }
        }

        case 'movies': {
          return {
              ...state,
              success: true,
              movie: action.payload as Movie
            }
        }
      }
    }

    case DataActionTypes.QueryData: {
        return {
          ...state,
          success: false
        };
    }

    case DataActionTypes.QueryDataDone: {
      switch(action.model.toLowerCase()) {
          case 'actors': {
            return {
                ...state,
                success: true,
                actors: action.payload as Array<Actor>
              }
          }

          case 'movies': {
            return {
                ...state,
                success: true,
                movies: action.payload as Array<Movie>
              }
          }

      }
    }

    case DataActionTypes.Delete: {
        return {
          ...state,
          success: true
        };
    }

    default: {
      return state;
    }
  }
}

export const getStatus = (state: State) => state.success;
export const getActors  = (state: State):Array<Actor> => state.actors
export const getMovies = (state: State):Array<Movie> => state.movies
export const getActor  = (state: State):Actor => state.actor
export const getMovie = (state: State):Movie => state.movie
