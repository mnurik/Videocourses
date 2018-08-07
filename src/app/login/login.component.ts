import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from '../../../node_modules/rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private loginSubscription: Subscription;

  constructor(private loginService: LoginService, private router: Router) { }

  public onSubmit(username, password) {
    this.loginSubscription = this.loginService.login(username, password).subscribe(({ token }) => {
      localStorage.setItem('token', token);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
