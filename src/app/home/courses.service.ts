import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../core/user-interface';
import { CourseClass } from '../shared/course-class';
import { CourseInterface } from '../shared/course-interface';

@Injectable()
export class CoursesService {
  private BASE_URL = 'http://localhost:3000';
  public courses: CourseInterface[] = [];

  constructor(private http: HttpClient) { }

  public getList(_page: string, _limit: string): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}/courses`, { params: { _page, _limit } });
  }

  public onCreate(data): Observable<any> {
    return this.http.post<UserInterface>(`${this.BASE_URL}/courses`, data);
  }

  public onUpdate({ id, ...rest }: CourseInterface): Observable<any> {
    return this.http.put<UserInterface>(`${this.BASE_URL}/courses/${id}`, rest);
  }

  public onDelete(id: number): Observable<CourseInterface> {
    return this.http.delete<CourseInterface>(`${this.BASE_URL}/courses/${id}`);
  }

  public onSearch(value: string): CourseInterface[] {
    return this.courses.filter((course: CourseInterface) => {
      const re = new RegExp(value, 'i');
      return (`${course.description} ${course.title} ${course.creationDate}`).match(re);
    });
  }

  public getById(id: string): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(`${this.BASE_URL}/courses/${id}`);
  }

  public onLike(id: number): Observable<CourseInterface> {
    return this.http.put<CourseInterface>(`${this.BASE_URL}/courses/${id}`, {});
  }
}
