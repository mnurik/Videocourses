import { Injectable } from '@angular/core';
import { UserClass } from '../core/user-class';
import { UserInterface } from '../core/user-interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: UserInterface = new UserClass(0, 'Admin', 'Admin', 'admin', '123');

  constructor() { }

  public login(username: string, password: string): void {
    if (username === this.user.username && password === this.user.password) {
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', `admin-${Date.now()}`);
    }
  }
  public logout(): void {
    localStorage.clear();
  }
  public isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public getUserInfo(): UserInterface {
    return JSON.parse(localStorage.getItem('user'));
  }
}
