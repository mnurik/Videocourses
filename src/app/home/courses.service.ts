import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserInterface } from '../core/user-interface';
import { LoadingService } from '../loading/loading.service';
import { CourseClass } from '../shared/course-class';
import { CourseInterface } from '../shared/course-interface';

@Injectable()
export class CoursesService {
  private BASE_URL = 'http://localhost:3004/courses';
  public courses: CourseInterface[] = [];

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  public getList(start: string, count: string): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}`, { params: { start, count } })
  }

  public onCreate(data): Observable<any> {
    return this.http.post<UserInterface>(`${this.BASE_URL}`, data)
      .pipe(
        tap(() => this.loadingService.toggle(false)),
      );
  }

  public onUpdate({ id, ...rest }: CourseInterface): Observable<any> {
    return this.http.put<UserInterface>(`${this.BASE_URL}/${id}`, rest)
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }

  public onDelete(id: number): Observable<CourseInterface> {
    return this.http.delete<CourseInterface>(`${this.BASE_URL}/${id}`)
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }

  public onSearch(value: string): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}`, { params: { textFragment: value } })
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }

  public getById(id: string): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(`${this.BASE_URL}/${id}`)
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }

  public onLike(id: number): Observable<CourseInterface> {
    return this.http.put<CourseInterface>(`${this.BASE_URL}/${id}`, {})
      .pipe(tap(() => { this.loadingService.toggle(false); }));
  }
}
