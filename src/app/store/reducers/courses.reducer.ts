import { ActionReducer } from '@ngrx/store';
import { CourseInterface } from '../../shared/course-interface';
import { CoursesActions, CoursesActionTypes } from '../actions/courses.actions';

export interface CoursesStateInterface {
  start: number;
  limit: number;
  list: CourseInterface[];
  course: CourseInterface;
}

export const coursesInitialState: CoursesStateInterface = {
  start: 0,
  limit: 5,
  list: [],
  course: {
    id: null,
    name: '',
    description: '',
    authors: [],
    creationDate: new Date().getTime(),
    duration: 0,
    liked: false,
    isTopRated: false,
  },
};

export const coursesReducer: ActionReducer<CoursesStateInterface> =
  (state: CoursesStateInterface = coursesInitialState, action: CoursesActions) => {
    switch (action.type) {
      case CoursesActionTypes.CoursesLoadSuccess:
        return {
          ...state,
          list: action.payload,
        };
      case CoursesActionTypes.CoursesDeleteSuccess:
        return {
          ...state,
          list: state.list.filter((course: CourseInterface) => course.id !== action.payload),
        };
      case CoursesActionTypes.CoursesPageAdd:
        return {
          ...state,
          limit: state.limit + 5,
        };
      case CoursesActionTypes.FetchCourseDataSuccess:
        return {
          ...state,
          course: action.payload,
        };
      case CoursesActionTypes.CourseReset:
        return {
          ...state,
          course: coursesInitialState.course,
        };
      default:
        return state;
    }
  };
