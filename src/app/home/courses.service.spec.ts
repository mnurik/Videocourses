import { inject, TestBed } from '@angular/core/testing';

import { CourseClass } from '../shared/course-class';
import { CourseInterface } from '../shared/course-interface';
import { mockCourses } from '../shared/mock-data';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  const expectedCourses: CourseClass[] = [...mockCourses];

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
    service.onDelete(1);
    expect(service.courses).toEqual(jasmine.arrayContaining([expectedCourses[0]]));
  }));

  it('should search in list', inject([CoursesService], (service: CoursesService) => {
    service.onSearch(mockCourses[1].description);
    expect(service.courses).toEqual(jasmine.arrayContaining([expectedCourses[1]]));
  }));

  it('should change field liked to true', inject([CoursesService], (service: CoursesService) => {
    service.onLike(mockCourses[0].id);
    expect(service.courses.map((course) => course.liked)).toEqual(jasmine.arrayContaining([true, false, false, false]));
  }));

  it('should create new course with onCreate method and return new list', inject([CoursesService], (service: CoursesService) => {
    const newMockCourse = {
      title: 'test title',
      description: 'test',
      duration: 50,
      creationDate: new Date().getTime(),
      authors: 'test auth',
    };
    service.onCreate(newMockCourse);
    expect(service.courses.map((c) => c.title)).toEqual(jasmine.arrayContaining(
      mockCourses.map((c) => c.title).concat([newMockCourse.title])));
  }));

  it('should create new course with onCreate method and return new list', inject([CoursesService], (service: CoursesService) => {
    const newMockCourse: CourseInterface = {
      id: 0,
      title: 'TOTALLY new Title',
      description: 'test',
      duration: 50,
      creationDate: new Date().getTime(),
      authors: 'test auth',
      topRated: false,
      liked: false,
    };
    service.onUpdate(newMockCourse);
    expect(service.courses.find((c) => c.title === 'TOTALLY new Title').id).toBe(0);
    newMockCourse.id = -1;
    newMockCourse.title = "Shouldn't touch any course";
    expect(service.courses.find((c) => c.title === "Shouldn't touch any course")).toBeUndefined();
  }));

  it('should change field liked to true', inject([CoursesService], (service: CoursesService) => {
    expect(service.getById('1')).toEqual({ ...mockCourses.find((c) => c.id === 1) });
  }));
});
