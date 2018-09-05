import { Action } from '@ngrx/store';
import { AuthorInterface } from '../../shared/author-interface';

export enum AuthorsActionTypes {
  AuthorsLoadRequest = '[AUTHORS] Load Request',
  AuthorsLoadSuccess = '[AUTHORS] Load Success',
  AuthorsLoadFailure = '[AUTHORS] Load Failure',
}

export class AuthorsLoadRequestAction implements Action {
  readonly type = AuthorsActionTypes.AuthorsLoadRequest;
  constructor() { }
}

export class AuthorsLoadSuccessAction implements Action {
  readonly type = AuthorsActionTypes.AuthorsLoadSuccess;
  constructor(public payload: AuthorInterface[]) { }
}

export class AuthorsLoadFailureAction implements Action {
  readonly type = AuthorsActionTypes.AuthorsLoadFailure;
  constructor(public payload: string) { }
}

export type AuthorActions = AuthorsLoadRequestAction
  | AuthorsLoadSuccessAction
  | AuthorsLoadFailureAction;
