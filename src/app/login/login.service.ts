import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import { UserInterface } from '../core/user-interface';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private BASE_URL = 'http://localhost:3004/auth';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  public login(login: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.BASE_URL}/login`, { login, password })
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }
  public logout(): void {
    localStorage.clear();
  }
  public isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.BASE_URL}/userInfo`)
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }
}
