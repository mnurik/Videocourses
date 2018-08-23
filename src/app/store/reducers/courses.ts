import { Action, ActionReducer } from '@ngrx/store';
import { CourseInterface } from '../../shared/course-interface';

export const ADD_COURSE = 'ADD_COURSE';

export const courseReducer: ActionReducer<CourseInterface[]> = (state: CourseInterface[] = [], action: Action) => {
  switch (action.type) {
    case ADD_COURSE:
      return [
        ...state,
      ];
    default:
      return state;
  }
};
