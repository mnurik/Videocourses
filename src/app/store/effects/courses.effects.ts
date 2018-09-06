import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesService } from '../../home/courses.service';
import { CourseInterface } from '../../shared/course-interface';
import * as CoursesActions from '../actions/courses.actions';
import { CoursesStateInterface } from '../reducers/courses.reducer';
import { AppState } from '../store.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store$: Store<AppState>,
    private router: Router,
  ) { }

  @Effect()
  public load$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.CoursesLoadRequest),
    withLatestFrom(this.store$.pipe(
      select('courses'),
      map((courses: CoursesStateInterface) => ({ start: courses.start, limit: courses.limit })),
    )),
    map((coursesState) => coursesState[1]),
    exhaustMap((coursesState: Partial<CoursesStateInterface>) =>
      this.coursesService.getList(coursesState.start, coursesState.limit).pipe(
        map((res) => new CoursesActions.CoursesLoadSuccessAction(res)),
        catchError((res) => of(new CoursesActions.CoursesLoadFailureAction(res.error))),
      ),
    ),
  );

  @Effect()
  public delete$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.CoursesDeleteRequest),
    map((action: CoursesActions.CoursesDeleteRequestAction) => action.payload),
    exhaustMap((id) =>
      this.coursesService.onDelete(id).pipe(
        map(() => new CoursesActions.CoursesDeleteSuccessAction(id)),
        catchError((res) => of(new CoursesActions.CoursesDeleteFailureAction(res.error))),
      ),
    ),
  );

  @Effect()
  public search$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.CoursesSearchRequest),
    map((action: CoursesActions.CoursesSearchRequestAction) => action.payload),
    exhaustMap((searchText) =>
      this.coursesService.onSearch(searchText).pipe(
        map((res) => new CoursesActions.CoursesLoadSuccessAction(res)),
        catchError((res) => of(new CoursesActions.CoursesLoadFailureAction(res.error))),
      ),
    ),
  );

  @Effect()
  public like$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.CourseLikeRequest),
    map((action: CoursesActions.CourseLikeRequestAction) => action.payload),
    exhaustMap((id: number) =>
      this.coursesService.onLike(id).pipe(
        map((res) => new CoursesActions.CoursesLoadRequestAction()),
        catchError((res) => of(new CoursesActions.CoursesLoadFailureAction(res.error))),
      ),
    ),
  );

  @Effect()
  public fetchCourse$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.FetchCourseDataRequest),
    map((action: CoursesActions.FetchCourseDataRequestAction) => action.payload),
    filter((id) => !!id),
    exhaustMap((id: string) =>
      this.coursesService.getById(id).pipe(
        map((res) => new CoursesActions.FetchCourseDataSuccessAction(res)),
        catchError((res) => of(new CoursesActions.FetchCourseDataFailureAction(res.error))),
      ),
    ),
  );

  @Effect()
  public courseUpdate$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.CourseUpdateRequest),
    map((action: CoursesActions.CourseUpdateRequestAction) => action.payload),
    exhaustMap((data: CourseInterface) => {
      if (data.id) {
        return this.coursesService.onUpdate(data).pipe(
          map((res) => new CoursesActions.CourseUpdateSuccessAction(res)),
          catchError((res) => of(new CoursesActions.CourseUpdateFailureAction(res.error))),
        );
      } else {
        return this.coursesService.onCreate(data).pipe(
          map((res) => new CoursesActions.CourseCreateSuccessAction(res)),
          catchError((res) => of(new CoursesActions.CourseCreateFailureAction(res.error))),
        );
      }
    }),
  );

  @Effect({ dispatch: false })
  public courseCreateUpdateRedirect$: any = this.actions$.pipe(
    ofType(CoursesActions.CoursesActionTypes.CourseCreateSuccess, CoursesActions.CoursesActionTypes.CourseUpdateSuccess),
    tap(() => { this.router.navigate(['/']); }),
  );
}
