import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '../../../node_modules/@angular/router';
import { CoursesService } from '../home/courses.service';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let getByIdSpy;
  let coursesService;

  beforeEach(async(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['getById', 'onCreate', 'onUpdate']);
    getByIdSpy = coursesService.getById.and.returnValue({ title: 'test', creationDate: '2018-01-01' });
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), FormsModule],
      declarations: [CourseComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/course' },
        { provide: CoursesService, useValue: coursesService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method getById inside ngOnInit', () => {
    expect(getByIdSpy.calls.count()).toBe(1);
    expect(component.course.title).toBe('test');
    expect(component.course.creationDate).toBe('2018-01-01');
  });
});
