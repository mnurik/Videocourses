import { Action } from '@ngrx/store';
import { UserInterface } from '../../core/user-interface';

export enum LayoutActionTypes {
  Login = 'LOGIN',
}

export class LoginAction implements Action {
  readonly type = LayoutActionTypes.Login;
  constructor(private payload: any) { }
}

export type LayoutActions = LoginAction;
