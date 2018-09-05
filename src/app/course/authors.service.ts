import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorInterface } from '../shared/author-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private BASE_URL = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  public load(): Observable<AuthorInterface[]> {
    return this.http.get<AuthorInterface[]>(`${this.BASE_URL}/authors`);
  }
}
