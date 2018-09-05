import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthorsService } from '../../course/authors.service';
import { AuthorsActionTypes, AuthorsLoadFailureAction, AuthorsLoadSuccessAction } from '../actions/authors.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthorsEffects {

  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService,
  ) { }

  @Effect()
  public load$: any = this.actions$.pipe(
    ofType(AuthorsActionTypes.AuthorsLoadRequest),
    exhaustMap(() =>
      this.authorsService.load().pipe(
        map((res) => new AuthorsLoadSuccessAction(res)),
        catchError((res) => of(new AuthorsLoadFailureAction(res.error))),
      ),
    ),
  );
}
