import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { UserInterface } from '../../shared/user-interface';
import { GetUserInfoFailureAction, GetUserInfoRequestAction, GetUserInfoSuccessAction, LoginActionTypes, LoginFailureAction, LoginRequestAction, LoginSuccessAction } from '../actions/login.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
  ) { }

  @Effect()
  public login$: any = this.actions$.pipe(
    ofType(LoginActionTypes.LoginRequest),
    map((action: LoginRequestAction) => action.payload),
    exhaustMap((auth: Partial<UserInterface>) =>
      this.loginService
        .login(auth.login, auth.password)
        .pipe(
          map((res) => new LoginSuccessAction(res.token)),
          catchError((res) => of(new LoginFailureAction(res.error))),
        ),
    ),
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSuccess),
    map((action: LoginSuccessAction) => {
      localStorage.setItem('token', action.payload);
      this.router.navigate(['/']);
      return new GetUserInfoRequestAction();
    }),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginRedirect, LoginActionTypes.Logout),
    tap(() => {
      this.loginService.logout();
      this.router.navigate(['/login']);
    }),
  );

  @Effect()
  public getUserInfo$: any = this.actions$.pipe(
    ofType(LoginActionTypes.GetUserInfoRequest),
    exhaustMap(() =>
      this.loginService.getUserInfo().pipe(
        map((user: UserInterface) => new GetUserInfoSuccessAction(user)),
        catchError((res) => of(new GetUserInfoFailureAction(res.error))),
      ),
    ),
  );
}
