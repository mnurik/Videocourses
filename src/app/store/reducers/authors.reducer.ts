import { ActionReducer } from '@ngrx/store';
import { AuthorInterface } from '../../shared/author-interface';
import { AuthorActions, AuthorsActionTypes } from '../actions/authors.actions';

export const authorReducer: ActionReducer<AuthorInterface[]> = (state: AuthorInterface[] = [], action: AuthorActions) => {
  switch (action.type) {
    case AuthorsActionTypes.AuthorsLoadSuccess:
      return action.payload;
    default:
      return state;
  }
};
