import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromActor from './actor';

export interface ActorState {
  status: fromActor.State
}

export interface State {
  auth: ActorState;
}

export const reducers = {
  status: fromActor.reducer
};

export const selectActorState = createFeatureSelector<ActorState>('auth');

export const selectStatusState = createSelector(
selectActorState,
  (state: ActorState) => state.status
);
export const getActor = createSelector(selectStatusState, fromActor.getActor);
export const getActors = createSelector(selectStatusState, fromActor.getActors);
export const getStatus = createSelector(selectStatusState, fromActor.getStatus);
