import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { UserClass } from '../user-class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, DoCheck {
  user: UserClass;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngDoCheck() {
    this.user = this.loginService.getUserInfo();
  }

  ngOnInit() {
    if (!this.loginService.isAuthenticated()) {
      this.logout();
    }
  }

  public onLogOut(): void {
    this.logout();
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
