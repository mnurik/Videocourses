import { Injectable } from '@angular/core';
import { CourseClass } from '../course-class';
import { CourseInterface } from '../course-interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  constructor() { }

  public getList(): CourseInterface[] {
    return [
      new CourseClass(0, 'Learn Angular', 'Angular Awesome', '01.01.2018', 50),
      new CourseClass(
        1,
        'Learn TypeScript',
        'Lorem ipsum dolor sit amet, patrioque gloriatur comprehensam no eum, no eos inermis nonumes accusamus, no maiorum repudiandae eos. Ius no erat iuvaret, vim cu diam posse dolore putant rationibus pro in. Eu ius veniam gloriatur, vide mediocritatem et nam. Vel ea corrumpit mnesarchum. Te ius summo vulputate mnesarchum.',
        '01.12.2017',
        120,
      ),
    ];
  }
}
