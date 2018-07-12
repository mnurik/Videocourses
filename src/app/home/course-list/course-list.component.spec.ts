import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CourseClass } from '../../shared/course-class';
import { CoursesService } from '../courses.service';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let coursesServiceStub: Partial<CoursesService>;
  let expectedCourses: CourseClass[] = [
    new CourseClass(123, 'test title', 'test desc. 1', new Date('01/01/2018').getTime(), 120),
    new CourseClass(124, 'test title', 'test desc. 2', new Date('01/01/2018').getTime(), 60),
  ];

  beforeEach(async(() => {
    coursesServiceStub = {
      getList() {
        return expectedCourses;
      },
      onDelete(id: number) {
        expectedCourses = expectedCourses.filter((course) => course.id !== id);
        return expectedCourses;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two child components', () => {
    fixture.detectChanges();
    expect(component.courses).toEqual(jasmine.arrayContaining(expectedCourses));
    expect(fixture.nativeElement.querySelectorAll('app-course-item').length).toEqual(2);
  });

  it('should call delete method', () => {
    fixture.detectChanges();
    component.onDelete(123);
    expect(component.courses).toEqual(jasmine.arrayContaining(expectedCourses));
  });

  it('should call onSearch and change courses array', () => {
    const testDesc = 'test desc. 2';
    fixture.detectChanges();
    component.onSearch('test desc. 2');
    expect(component.courses).toEqual(jasmine.arrayContaining([expectedCourses.find((course) => course.description === testDesc)]));
  });

  it('should call loadMore', () => {
    fixture.detectChanges();
    expect(component.loadMore).toBeTruthy();
    expect(component.loadMore()).toBe(undefined);
  });

  it('should call ngDoCheck lifecycle hook', () => {
    fixture.detectChanges();
    expect(component.ngDoCheckChecker).toBeTruthy();
  });

  xit('should call ngDoCheck lifecycle hook', () => {
    expectedCourses = [...expectedCourses, new CourseClass(125, 'test title', 'test desc. 3', new Date('01/01/2019').getTime(), 180)];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-course-item').length).toEqual(3);
  });

  xit('should show no data message', () => {
    component.onDelete(123);
    component.onDelete(124);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-course-item').length).toEqual(0);
    expect(fixture.nativeElement.querySelector('h4').textContent).toEqual('NO DATA, FEEL FREE TO ADD NEW COURSE');
  });
});
