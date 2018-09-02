import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { UserInterface } from '../../core/user-interface';
import { LoginService } from '../../login/login.service';
import { LoginActionTypes, LoginFailureAction, LoginRequestAction, LoginSuccessAction } from '../actions/login.actions';

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

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSuccess),
    tap((action: LoginSuccessAction) => {
      localStorage.setItem('token', action.payload);
      this.router.navigate(['/']);
    }),
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginRedirect, LoginActionTypes.Logout),
    tap((authed) => {
      this.router.navigate(['/login']);
    }),
  );
}
