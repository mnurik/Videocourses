import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesService } from '../../home/courses.service';
import { CourseInterface } from '../../shared/course-interface';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { LinkInterface } from './link-interface';

@Component({
  template: `
    <app-breadcrumbs [addLinks]="addLinks"></app-breadcrumbs>
  `,
})
class TestHostComponent {
  public addLinks: LinkInterface[] = [{ name: 'test' }];
}

describe('BreadcrumbsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let coursesService;
  let getByIdSpy;
  const fakeCourse: Partial<CourseInterface> = {
    name: 'test',
  };

  beforeEach(async(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['getById']);
    getByIdSpy = coursesService.getById.and.returnValue(fakeCourse);
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [BreadcrumbsComponent, TestHostComponent],
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

  });
});
