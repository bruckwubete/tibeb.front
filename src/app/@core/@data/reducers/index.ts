import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Actor } from '../models/actor';
import * as fromData from './data'

export interface DataSate {
  data: fromData.State
}

export interface State {
  data: DataSate
}

export const reducers = {
  data: fromData.reducer
};

export const selectDataState = createFeatureSelector<DataSate>('data');

export const selectDataStatus = createSelector(
  selectDataState,
    (state: DataSate) => state.data
);

export const getActors = createSelector(selectDataStatus, fromData.getActors);
export const getMoives = createSelector(selectDataStatus, fromData.getMovies);
export const getActor = createSelector(selectDataStatus, fromData.getActor);
export const getMoive = createSelector(selectDataStatus, fromData.getMovie);
