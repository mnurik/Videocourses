import { Injectable } from '@angular/core';
import { UserClass } from '../core/user-class';
import { UserInterface } from '../core/user-interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: UserInterface = new UserClass(0, 'Admin', 'Admin', 'admin', '123');

  constructor() { }

  public login(username: string, password: string): void {
    if (username === this.user.username && password === this.user.password) {
      window.localStorage.setItem('user', JSON.stringify(this.user));
      window.localStorage.setItem('token', `admin-${Date.now()}`);
    }
  }
  public logout(): void {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
  }
  public isAuthenticated(): boolean {
    return window.localStorage.getItem('token') !== null;
  }

  public getUserInfo(): UserInterface {
    return JSON.parse(window.localStorage.getItem('user'));
  }
}
