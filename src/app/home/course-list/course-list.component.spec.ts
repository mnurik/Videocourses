import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CourseClass } from '../../shared/course-class';
import { mockCourses } from '../../shared/mock-data';
import { CoursesService } from '../courses.service';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let coursesServiceStub: Partial<CoursesService>;
  let expectedCourses: CourseClass[] = mockCourses;

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
      onLike(id: number) {
        return mockCourses.map((course) => ({
          ...course,
          liked: course.id === id,
        }));
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
    expect(fixture.nativeElement.querySelectorAll('app-course-item').length).toEqual(4);
  });

  it('should call delete method', () => {
    fixture.detectChanges();
    component.onDelete(mockCourses[0].id);
    expect(component.courses).toEqual(jasmine.arrayContaining(expectedCourses));
  });

  it('should call onSearch and change courses array', () => {
    fixture.detectChanges();
    component.onSearch(mockCourses[1].description);
    expect(component.courses).toEqual(jasmine.arrayContaining([mockCourses[1]]));
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

  it('should call onLike and change courses array', () => {
    fixture.detectChanges();
    component.onLike(mockCourses[0].id);
    expect(component.courses.map((course) => course.liked)).toEqual(jasmine.arrayContaining([true, false, false, false]));
  });
});
