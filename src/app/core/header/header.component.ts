import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { GetUserInfoRequestAction, LogoutAction } from '../../store/actions/login.actions';
import { LoginStateInterface } from '../../store/reducers/login.reducer';
import { AppState } from '../../store/store.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user$;

  constructor(private loginService: LoginService, private store$: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store$.pipe(
      select('login'),
      map((loginState: LoginStateInterface) => loginState.user),
    );

    if (this.loginService.isAuthenticated()) {
      this.store$.dispatch(new GetUserInfoRequestAction());
    }
  }

  public logout(): void {
    this.store$.dispatch(new LogoutAction());
  }

  public ngOnDestroy() {
    this.user$.unsubscribe();
  }
}
