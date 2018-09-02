import { ActionReducer } from '@ngrx/store';
import { LoginActions, LoginActionTypes } from '../actions/login.actions';

export const loginReducer: ActionReducer<string> = (state: string, action: LoginActions) => {
  switch (action.type) {
    case LoginActionTypes.LoginFailure:
      return action.payload;
    default:
      return state;
  }
};
