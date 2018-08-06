import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  public onSubmit(username, password) {
    this.loginService.login(username, password).subscribe(({ token }) => {
      localStorage.setItem('token', token);
      this.router.navigate(['/']);
    });
  }
}
