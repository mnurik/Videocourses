import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesService } from '../../home/courses.service';
import { CourseInterface } from '../../shared/course-interface';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let coursesService;
  let getByIdSpy;
  const fakeCourse: Partial<CourseInterface> = {
    title: 'test',
  };

  beforeEach(async(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['getById']);
    getByIdSpy = coursesService.getById.and.returnValue(fakeCourse);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [BreadcrumbsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: CoursesService, useValue: coursesService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize list of links', () => {
    expect(component.links).toEqual([{
      name: 'Courses',
      to: '/',
    }, { name: 'test' }]);
  });
});
