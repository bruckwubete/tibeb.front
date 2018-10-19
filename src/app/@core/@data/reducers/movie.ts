import { MovieActionTypes, MovieActions } from '../actions/movie';
import { Movie } from '../models/movie';

export interface State {
  success: boolean;
  movie: any,
  movies: any
}

export const initialState: State = {
  success: false,
  movie: null,
  movies: null
};

export function reducer(state = initialState, action: MovieActions): State {
  switch (action.type) {
    case MovieActionTypes.Get || MovieActionTypes.Update: {
      return {
        ...state,
        success: true
      };
    }

    case MovieActionTypes.QueryMovies: {
        return {
          ...state,
          success: false
        };
    }

    case MovieActionTypes.QueryMoviesDone: {
      return {
        ...state,
        success: true,
        movies: action.payload,
      };
    }

    case MovieActionTypes.Delete: {
        return {
          ...state,
          success: true,
          movie: null,
        };
    }

    default: {
      return state;
    }
  }
}

export const getStatus = (state: State) => state.success;
export const getMovie  = (state: State):Movie => {
  if(state != undefined) {
    return state.movie;
  }
};
export const getMovies  = (state: State):Array<Movie> =>{
  if(state != undefined) {
    return state.movies;
  }
};
