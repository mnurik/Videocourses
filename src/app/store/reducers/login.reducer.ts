import { ActionReducer } from '@ngrx/store';
import { UserInterface } from '../../shared/user-interface';
import { LoginActions, LoginActionTypes } from '../actions/login.actions';

export interface LoginStateInterface {
  errorMessage: string;
  user: UserInterface;
}

export const initialLoginState: LoginStateInterface = {
  errorMessage: '',
  user: null,
};

export const loginReducer: ActionReducer<LoginStateInterface> = (state: LoginStateInterface = initialLoginState, action: LoginActions) => {
  switch (action.type) {
    case LoginActionTypes.LoginFailure:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case LoginActionTypes.Logout:
      return {
        ...state,
        user: null,
      };
    case LoginActionTypes.GetUserInfoSuccess:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
