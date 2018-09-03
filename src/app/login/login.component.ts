import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from '../../../node_modules/rxjs';
import { LoginRequestAction } from '../store/actions/login.actions';
import { LoginStateInterface } from '../store/reducers/login.reducer';
import { AppState } from '../store/store.interface';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  public errorMessage$;

  constructor(private loginService: LoginService, private router: Router, private store$: Store<AppState>) { }

  public onSubmit(login, password) {
    this.store$.dispatch(new LoginRequestAction({ login, password }));
    this.errorMessage$ = this.store$.pipe(
      select('login'),
      map((loginState: LoginStateInterface) => loginState.errorMessage),
    );
  }

  ngOnDestroy() {
    this.errorMessage$.unsubscribe();
  }
}
