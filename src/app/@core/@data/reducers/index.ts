import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromActor from './actor';
import * as fromMovie from './movie';
import { Actor } from '../models/actor';

export interface DataSate {
  actor: fromActor.State
  movie: fromMovie.State
}

export interface State {
  data: DataSate
}

export const reducers = {
  actor: fromActor.reducer,
  movie: fromMovie.reducer
};

export const selectDataState = createFeatureSelector<DataSate>('data');

export const selectActorStatus = createSelector(
  selectDataState,
  (state: DataSate) => state.actor
);

export const selectMoiveStatus = createSelector(
  selectDataState,
    (state: DataSate) => state.movie
);


export const getActor = createSelector(selectActorStatus, fromActor.getActor);
export const getActors = createSelector(selectActorStatus, fromActor.getActors);
export const getStatus = createSelector(selectActorStatus, fromActor.getStatus);

export const getMovie = createSelector(selectMoiveStatus, fromMovie.getMovie);
export const getMoives = createSelector(selectMoiveStatus, fromMovie.getMovies);
export const getMoiveStatus = createSelector(selectMoiveStatus, fromMovie.getStatus);
