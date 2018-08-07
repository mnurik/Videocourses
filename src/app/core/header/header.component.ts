import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { UserInterface } from '../user-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user$ = new BehaviorSubject<{ first: string; last: string }>(null);

  private routerSubscription: Subscription;
  private getUserInfoSubscription: Subscription;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  loadData() {
    if (this.loginService.isAuthenticated()) {
      this.getUserInfoSubscription = this.loginService.getUserInfo()
        .subscribe((user: UserInterface) => this.user$.next(user.name));
    }
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
    this.getUserInfoSubscription.unsubscribe();
  }
}
