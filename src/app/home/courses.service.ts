import { Injectable } from '@angular/core';
import { CourseClass } from '../shared/course-class';
import { CourseInterface } from '../shared/course-interface';
import { mockCourses } from '../shared/mock-data';

@Injectable()
export class CoursesService {
  public courses: CourseInterface[];

  public getList(): CourseInterface[] {
    this.courses = [...mockCourses];

    return this.courses;
  }

  public onCreate(title: string, description: string, duration: number): CourseInterface[] {
    this.courses = this.courses.concat([
      new CourseClass(Date.now(), title, description, Date.now(), duration),
    ]);
    return this.courses;
  }

  public onUpdate(id: number, title: string, description: string, duration: number): CourseInterface[] {
    this.courses = this.courses.map((course: CourseInterface) => {
      if (course.id === id) {
        return {
          ...course,
          title,
          description,
          duration,
        };
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
      return mockCourses.find((course: CourseInterface) => course.id === +id);
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
