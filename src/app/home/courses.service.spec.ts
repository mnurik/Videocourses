import { inject, TestBed } from '@angular/core/testing';

import { CourseClass } from './course-class';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  const expectedCourses: CourseClass[] = [
    new CourseClass(0, 'Learn Angular', 'Angular Awesome', '01.01.2018', 50),
    new CourseClass(
      1,
      'Learn TypeScript',
      'Lorem ipsum dolor sit amet, patrioque gloriatur comprehensam no eum, no eos inermis nonumes accusamus, no maiorum repudiandae eos. Ius no erat iuvaret, vim cu diam posse dolore putant rationibus pro in. Eu ius veniam gloriatur, vide mediocritatem et nam. Vel ea corrumpit mnesarchum. Te ius summo vulputate mnesarchum.',
      '01.12.2017',
      120,
    ),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    expect(service.courses).toEqual(jasmine.arrayContaining(expectedCourses));
  }));

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    service.onDelete(1);
    expect(service.courses).toEqual(jasmine.arrayContaining([expectedCourses[0]]));
  }));

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    service.onSearch('typescript');
    expect(service.courses).toEqual(jasmine.arrayContaining([expectedCourses[1]]));
  }));
});
