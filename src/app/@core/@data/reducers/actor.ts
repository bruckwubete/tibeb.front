import { ActorActionTypes, ActorActions } from '../actions/actor';
import { Actor } from '../models/actor';

export interface State {
  success: boolean;
  actor: any;
}

export const initialState: State = {
  success: false,
  actor: null,
};

export function reducer(state = initialState, action: ActorActions): State {
  switch (action.type) {
    case ActorActionTypes.Get || ActorActionTypes.Update: {
      return {
        ...state,
        success: true,
        actor: action.payload,
      };
    }

    case ActorActionTypes.QueryActors: {
        return {
          ...state,
          success: true,
          actor: action.payload,
        };
    }

    case ActorActionTypes.Delete: {
        return {
          ...state,
          success: true,
          actor: null,
        };
    }

    default: {
      return state;
    }
  }
}

export const getStatus = (state: State) => state.success;
export const getActor  = (state: State):Actor => state.actor;
export const getActors  = (state: State):Array<Actor> => state.actor;
