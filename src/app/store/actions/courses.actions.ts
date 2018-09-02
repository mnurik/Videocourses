import { Action } from '@ngrx/store';
import { CourseInterface } from '../../shared/course-interface';
import { Observable } from 'rxjs';

export enum CoursesActionTypes {
  CoursesLoadRequest = '[COURSES] Load Request',
  CoursesLoadSuccess = '[COURSES] Load Success',
  CoursesLoadFailure = '[COURSES] Load Failure',

  CoursesDeleteRequest = '[COURSES] Delete Request',
  CoursesDeleteSuccess = '[COURSES] Delete Success',
  CoursesDeleteFailure = '[COURSES] Delete Failure',

  CoursesPageAdd = '[COURSES] Page Add',
  CoursesSearchRequest = '[COURSES] Search Request',
  CourseLikeRequest = '[COURSE] Like Request',
  CourseReset = '[COURSE] Reset',

  FetchCourseDataRequest = '[COURSE DATA] Fetch Request',
  FetchCourseDataSuccess = '[COURSE DATA] Fetch Success',
  FetchCourseDataFailure = '[COURSE DATA] Fetch Failure',

  CourseCreateRequest = '[COURSE CREATE] Request',
  CourseCreateSuccess = '[COURSE CREATE] Success',
  CourseCreateFailure = '[COURSE CREATE] Failure',

  CourseUpdateRequest = '[COURSE UPDATE] Request',
  CourseUpdateSuccess = '[COURSE UPDATE] Success',
  CourseUpdateFailure = '[COURSE UPDATE] Failure',
}

export class CoursesLoadRequestAction implements Action {
  readonly type = CoursesActionTypes.CoursesLoadRequest;
  constructor() { }
}

export class CoursesLoadSuccessAction implements Action {
  readonly type = CoursesActionTypes.CoursesLoadSuccess;
  constructor(public payload: CourseInterface[]) { }
}

export class CoursesLoadFailureAction implements Action {
  readonly type = CoursesActionTypes.CoursesLoadFailure;
  constructor(public payload) { }
}

export class CoursesDeleteRequestAction implements Action {
  readonly type = CoursesActionTypes.CoursesDeleteRequest;
  constructor(public payload: number) { }
}

export class CoursesDeleteSuccessAction implements Action {
  readonly type = CoursesActionTypes.CoursesDeleteSuccess;
  constructor(public payload) { }
}

export class CoursesDeleteFailureAction implements Action {
  readonly type = CoursesActionTypes.CoursesDeleteFailure;
  constructor(public payload) { }
}

export class CoursesPageAddAction implements Action {
  readonly type = CoursesActionTypes.CoursesPageAdd;
  constructor() { }
}

export class CoursesSearchRequestAction implements Action {
  readonly type = CoursesActionTypes.CoursesSearchRequest;
  constructor(public payload: string) { }
}

export class CourseLikeRequestAction implements Action {
  readonly type = CoursesActionTypes.CourseLikeRequest;
  constructor(public payload: number) { }
}

export class FetchCourseDataRequestAction implements Action {
  readonly type = CoursesActionTypes.FetchCourseDataRequest;
  constructor(public payload: string) { }
}

export class FetchCourseDataSuccessAction implements Action {
  readonly type = CoursesActionTypes.FetchCourseDataSuccess;
  constructor(public payload: CourseInterface) { }
}

export class FetchCourseDataFailureAction implements Action {
  readonly type = CoursesActionTypes.FetchCourseDataFailure;
  constructor(public payload) { }
}

export class CourseCreateRequestAction implements Action {
  readonly type = CoursesActionTypes.CourseCreateRequest;
  constructor(public payload: CourseInterface) { }
}

export class CourseCreateSuccessAction implements Action {
  readonly type = CoursesActionTypes.CourseCreateSuccess;
  constructor(public payload: CourseInterface) { }
}

export class CourseCreateFailureAction implements Action {
  readonly type = CoursesActionTypes.CourseCreateFailure;
  constructor(public payload) { }
}

export class CourseUpdateRequestAction implements Action {
  readonly type = CoursesActionTypes.CourseUpdateRequest;
  constructor(public payload: Observable<CourseInterface>) { }
}

export class CourseUpdateSuccessAction implements Action {
  readonly type = CoursesActionTypes.CourseUpdateSuccess;
  constructor(public payload: CourseInterface) { }
}

export class CourseUpdateFailureAction implements Action {
  readonly type = CoursesActionTypes.CourseUpdateFailure;
  constructor(public payload) { }
}

export class CourseResetAction implements Action {
  readonly type = CoursesActionTypes.CourseReset;
  constructor() { }
}

export type CoursesActions = CoursesLoadRequestAction
  | CoursesLoadSuccessAction
  | CoursesLoadFailureAction
  | CoursesDeleteRequestAction
  | CoursesDeleteSuccessAction
  | CoursesDeleteFailureAction
  | CoursesPageAddAction
  | CoursesSearchRequestAction
  | CourseLikeRequestAction
  | FetchCourseDataRequestAction
  | FetchCourseDataSuccessAction
  | FetchCourseDataFailureAction
  | CourseCreateRequestAction
  | CourseCreateSuccessAction
  | CourseCreateFailureAction
  | CourseUpdateRequestAction
  | CourseUpdateSuccessAction
  | CourseUpdateFailureAction
  | CourseResetAction;
