import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { UserClass } from '../user-class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user$ = new BehaviorSubject<UserClass>(null);

  private routerSubscription: Subscription;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (!this.loginService.isAuthenticated()) {
      this.logout();
    }

    this.routerSubscription = this.router.events
      .subscribe(() => this.user$.next(this.loginService.getUserInfo()));
  }

  public onLogOut(): void {
    this.logout();
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
