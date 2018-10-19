import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromActor from './actor';
import * as fromMovie from './movie';

export interface ActorState {
  status: fromActor.State
}

export interface MovieState {
  status: fromMovie.State
}

export interface State {
  actor: ActorState,
  movie: MovieState
}

export const reducers = {
  actor: fromActor.reducer,
  movie: fromMovie.reducer
};

export const selectActorState = createFeatureSelector<ActorState>('actor');
export const selectMovieState = createFeatureSelector<MovieState>('movie');

export const selectActorStatus = createSelector(
selectActorState,
  (state: ActorState) => state.status
);

export const selectMoiveStatus = createSelector(
  selectMovieState,
    (state: MovieState) => state.status
);


export const getActor = createSelector(selectActorStatus, fromActor.getActor);
export const getActors = createSelector(selectActorStatus, fromActor.getActors);
export const getStatus = createSelector(selectActorStatus, fromActor.getStatus);

export const getMovie = createSelector(selectMoiveStatus, fromMovie.getMovie);
export const getMoives = createSelector(selectMoiveStatus, fromMovie.getMovies);
export const getMoiveStatus = createSelector(selectMoiveStatus, fromMovie.getStatus);
