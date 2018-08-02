import { Injectable } from '@angular/core';
import { CourseClass } from '../shared/course-class';
import { CourseInterface } from '../shared/course-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CoursesService {
  private BASE_URL = "http://localhost:3000";
  public courses: CourseInterface[] = [];

  constructor(private http: HttpClient) { }

  public getList(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${this.BASE_URL}/courses`);
  }

  public onCreate({ title, description, duration, authors, creationDate }): CourseInterface[] {
    this.courses = this.courses.concat([
      new CourseClass(Date.now(), title, description, creationDate, duration, authors),
    ]);
    return this.courses;
  }

  public onUpdate(data: CourseInterface): CourseInterface[] {
    this.courses = this.courses.map((course: CourseInterface) => {
      if (course.id === data.id) {
        return Object.assign({}, course, data);
      } else { return course; }
    });
    return this.courses;
  }

  public onDelete(id: number): CourseInterface[] {
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
