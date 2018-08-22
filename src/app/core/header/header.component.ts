import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
      this.loginService.getUserInfo().pipe(take(1))
        .subscribe((user: UserInterface) => this.user$.next(user.name));
    } else {
      this.user$.next(null);
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
  }
}
