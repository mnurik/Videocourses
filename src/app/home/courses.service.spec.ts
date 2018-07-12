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

  it('should get list', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    expect(service.courses).toEqual(jasmine.arrayContaining(expectedCourses));
  }));

  it('should delete', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    service.onDelete(1);
    expect(service.courses).toEqual(jasmine.arrayContaining([expectedCourses[0]]));
  }));

  it('should search in list', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    service.onSearch(mockCourses[1].description);
    expect(service.courses).toEqual(jasmine.arrayContaining([expectedCourses[1]]));
  }));

  it('should change field liked to true', inject([CoursesService], (service: CoursesService) => {
    service.getList();
    service.onLike(mockCourses[0].id);
    expect(service.courses.map((course) => course.liked)).toEqual(jasmine.arrayContaining([true, false, false, false]));
  }));
});
