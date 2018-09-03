import { Action } from '@ngrx/store';
import { UserInterface } from '../../shared/user-interface';

export enum LoginActionTypes {
  LoginRequest = '[LOGIN] Request',
  LoginSuccess = '[LOGIN] Success',
  LoginFailure = '[LOGIN] Failure',
  LoginRedirect = '[LOGIN] Redirect',
  Logout = '[LOGIN] Logout',

  GetUserInfoRequest = '[USER] GetInfo Request',
  GetUserInfoSuccess = '[USER] Get Info Success',
  GetUserInfoFailure = '[USER] Get Info Failure',
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
  constructor(public payload: string) { }
}

export class LoginRedirectAction implements Action {
  readonly type = LoginActionTypes.LoginRedirect;
  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  readonly type = LoginActionTypes.Logout;
  constructor() { }
}

export class GetUserInfoRequestAction implements Action {
  readonly type = LoginActionTypes.GetUserInfoRequest;
  constructor() { }
}

export class GetUserInfoSuccessAction implements Action {
  readonly type = LoginActionTypes.GetUserInfoSuccess;
  constructor(public payload: UserInterface) { }
}

export class GetUserInfoFailureAction implements Action {
  readonly type = LoginActionTypes.GetUserInfoFailure;
  constructor(public payload: string) { }
}

export type LoginActions = LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LoginRedirectAction
  | LogoutAction
  | GetUserInfoRequestAction
  | GetUserInfoSuccessAction
  | GetUserInfoFailureAction;
