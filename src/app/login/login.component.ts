import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Subscription } from '../../../node_modules/rxjs';
import { LoginRequestAction } from '../store/actions/login.actions';
import { AppState } from '../store/store.interface';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private loginSubscription: Subscription;
  public errorMessage = '';

  constructor(private loginService: LoginService, private router: Router, private store: Store<AppState>) { }

  public onSubmit(login, password) {
    this.store.dispatch(new LoginRequestAction({ login, password }));
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
