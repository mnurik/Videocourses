import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { UserInterface } from '../core/user-interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private BASE_URL = 'http://localhost:3004/auth';

  constructor(private http: HttpClient) {}

  public login(login: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.BASE_URL}/login`, { login, password });
  }
  public logout(): void {
    localStorage.clear();
  }
  public isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.BASE_URL}/userInfo`);
  }
}
