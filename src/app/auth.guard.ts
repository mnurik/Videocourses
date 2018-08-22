import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private loginService: LoginService) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return of(this.loginService.isAuthenticated());
  }
}
