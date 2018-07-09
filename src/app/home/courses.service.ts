import { Injectable } from '@angular/core';
import { CourseClass } from './course-class';
import { CourseInterface } from './course-interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: CourseInterface[];
  constructor() { }

  public getList(): CourseInterface[] {
    this.courses = [
      new CourseClass(0, 'Learn Angular', 'Angular is Awesome', 1514761200000, 50),
      new CourseClass(
        1,
        'Learn TypeScript',
        'Lorem ipsum dolor sit amet, patrioque gloriatur comprehensam no eum, no eos inermis nonumes accusamus, no maiorum repudiandae eos. Ius no erat iuvaret, vim cu diam posse dolore putant rationibus pro in. Eu ius veniam gloriatur, vide mediocritatem et nam. Vel ea corrumpit mnesarchum. Te ius summo vulputate mnesarchum.',
        1484175600000,
        120,
        true,
      ),
      new CourseClass(2, 'Learn React', 'React is Awesome', 1514761200000, 230),
      new CourseClass(3, 'Learn Vue', 'Vue is Awesome', new Date().getTime(), 30),
    ];

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
}
