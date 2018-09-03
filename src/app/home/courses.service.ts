import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/user-interface';
import { LoadingService } from '../loading/loading.service';
import { CourseInterface } from '../shared/course-interface';

@Injectable()
export class CoursesService {
  private BASE_URL = 'http://localhost:3004/courses';
  public courses: CourseInterface[] = [];

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  public getList(start: number, count: number): Observable<CourseInterface[]> {
    const params = {
      start: String(start),
      count: String(count),
    };
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}`, { params });
  }

  public onCreate(data): Observable<any> {
    return this.http.post<UserInterface>(`${this.BASE_URL}`, data);
  }

  public onUpdate({ id, ...rest }: CourseInterface): Observable<any> {
    return this.http.put<UserInterface>(`${this.BASE_URL}/${id}`, rest);
  }

  public onDelete(id: number): Observable<CourseInterface> {
    return this.http.delete<CourseInterface>(`${this.BASE_URL}/${id}`);
  }

  public onSearch(value: string): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}`, { params: { textFragment: value } });
  }

  public getById(id: string): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(`${this.BASE_URL}/${id}`);
  }

  public onLike(id: number): Observable<CourseInterface> {
    return this.http.put<CourseInterface>(`${this.BASE_URL}/${id}`, { liked: true });
  }
}
