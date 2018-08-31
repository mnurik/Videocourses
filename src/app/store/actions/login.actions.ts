import { Action } from '@ngrx/store';
import { UserInterface } from '../../core/user-interface';

export enum LoginActionTypes {
  LoginRequest = '[LOGIN] Request',
  LoginSuccess = '[LOGIN] Success',
  LoginFailure = '[LOGIN] Error',
  LoginRedirect = '[LOGIN] Redirect',
  Logout = '[LOGIN] Logout',
}

export class LoginRequestAction implements Action {
  readonly type = LoginActionTypes.LoginRequest;
  constructor(public payload: Partial<UserInterface>) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LoginActionTypes.LoginSuccess;
  constructor(public payload: string) { }
}

export class LoginFailureAction implements Action {
  readonly type = LoginActionTypes.LoginFailure;
  constructor(public payload: any) { }
}

export class LoginRedirectAction implements Action {
  readonly type = LoginActionTypes.LoginRedirect;
  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  readonly type = LoginActionTypes.Logout;
  constructor(public payload: any) { }
}

export type LoginActions = LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LoginRedirectAction
  | LogoutAction;
