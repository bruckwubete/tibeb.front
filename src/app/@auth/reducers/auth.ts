import { AuthActions, AuthActionTypes } from './../actions/auth';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  registered: boolean
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  registered: false,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        registered: true,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.RegisterSuccess: {
      return {
        ...state,
        loggedIn: false,
        registered: true,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.ClearRegisterFlag: {
      return {
        ...state,
        registered: false,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getRegistered = (state: State) => state.registered;
export const getUser = (state: State) => state.user;
