import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LoginRequestAction } from '../store/actions/login.actions';
import { LoginStateInterface } from '../store/reducers/login.reducer';
import { AppState } from '../store/store.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public errorMessage$;
  public loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.errorMessage$ = this.store$.pipe(
      select('login'),
      map((loginState: LoginStateInterface) => loginState.errorMessage),
    );
  }

  public onSubmit() {
    this.store$.dispatch(new LoginRequestAction(this.loginForm.value));
  }
}
