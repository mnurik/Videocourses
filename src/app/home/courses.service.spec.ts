import { inject, TestBed } from '@angular/core/testing';

import { CourseClass } from '../shared/course-class';
import { mockCourses } from '../shared/mock-data';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  const expectedCourses: CourseClass[] = mockCourses;

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
