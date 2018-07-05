import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CourseClass } from '../course-class';
import { CoursesService } from '../courses.service';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let coursesServiceStub: Partial<CoursesService>;
  const expectedCourses: CourseClass[] = [
    new CourseClass(123, 'test title', 'test desc. 1', '01/01/2018', 120),
    new CourseClass(124, 'test title', 'test desc. 2', '01/01/2018', 60),
  ];

  beforeEach(async(() => {
    coursesServiceStub = {
      getList() {
        return expectedCourses;
      },
      onDelete(index: number) {
        return [expectedCourses[index]];
      },
      onSearch(value: string) {
        return [expectedCourses.find((course) => course.description === value)];
      },
    };

    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: CoursesService, useValue: coursesServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two child components', () => {
    expect(component.courses).toEqual(jasmine.arrayContaining(expectedCourses));
    expect(fixture.nativeElement.querySelectorAll('app-course-item').length).toEqual(2);
  });

  it('should call delete method', () => {
    const index = 1;
    component.onDelete(index);
    expect(component.courses).toEqual(jasmine.arrayContaining([expectedCourses[index]]));
  });

  it('should call onSearch and change courses array', () => {
    component.onSearch('test desc. 2');
    expect(component.courses).toEqual(jasmine.arrayContaining([expectedCourses[1]]));
  });

  it('should call loadMore', () => {
    expect(component.loadMore).toBeTruthy();
    expect(component.loadMore()).toBe(undefined);
  });
});
