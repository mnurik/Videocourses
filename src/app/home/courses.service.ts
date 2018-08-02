import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseClass } from '../shared/course-class';
import { CourseInterface } from '../shared/course-interface';
import { mockCourses } from '../shared/mock-data';

@Injectable()
export class CoursesService {
  private coursesUrl = 'api/courses';

  constructor(private http: HttpClient) { }

  public courses$: Observable<CourseInterface[]>;

  public getList(): Observable<CourseInterface[]> {
    this.courses$ = this.http.get<CourseInterface[]>(this.coursesUrl);
    return this.courses$;
  }

  public onCreate({ title, description, duration, authors, creationDate }): CourseInterface[] {
    this.courses = this.courses.concat([
      new CourseClass(Date.now(), title, description, creationDate, duration, authors),
    ]);
    return this.courses$;
  }

  public onUpdate(data: CourseInterface): CourseInterface[] {
    this.courses$ = this.courses.map((course: CourseInterface) => {
      if (course.id === data.id) {
        return Object.assign({}, course, data);
      } else { return course; }
    });
    return this.courses$;
  }

  public onDelete(id: number): Observable<CourseInterface[]> {
    this.courses = this.courses.filter(
      (course: CourseInterface) => course.id !== id,
    );
    return this.courses;
  }

  public onSearch(value: string): CourseInterface[] {
    return this.courses.filter((course: CourseInterface) => {
      const re = new RegExp(value, 'i');
      return (`${course.description} ${course.title} ${course.creationDate}`).match(re);
    });
  }

  public getById(id: string): CourseInterface {
    if (/[0-9]/g.test(id)) {
      return { ...this.courses.find((course: CourseInterface) => course.id === +id) };
    }
  }

  public onLike(id: number): CourseInterface[] {
    this.courses = this.courses.map((course) => ({
      ...course,
      liked: course.id === id,
    }));
    return this.courses;
  }
}
