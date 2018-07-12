import { Injectable } from '@angular/core';
import { CourseInterface } from '../shared/course-interface';
import { mockCourses } from '../shared/mock-data';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: CourseInterface[];
  constructor() { }

  public getList(): CourseInterface[] {
    this.courses = mockCourses;

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

  public onLike(id: number): CourseInterface[] {
    this.courses = this.courses.map((course) => ({
      ...course,
      liked: course.id === id,
    }));
    return this.courses;
  }
}
