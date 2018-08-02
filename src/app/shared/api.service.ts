import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { CourseInterface } from './course-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}/courses`);
  }
}
