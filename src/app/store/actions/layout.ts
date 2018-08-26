import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  Login = '[Layout] Open Sidenav',
}

export class Login implements Action {
  readonly type = LayoutActionTypes.Login;
}

export type LayoutActions = Login;
