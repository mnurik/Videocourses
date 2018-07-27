import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CoursesService } from '../home/courses.service';
import { LoginComponent } from '../login/login.component';
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
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }]), FormsModule],
      declarations: [CourseComponent, LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
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

  it('should ', () => {
    const hostElement = fixture.nativeElement;
    const durationDisplay: HTMLInputElement = hostElement.querySelector('input[name="title"]');
    expect(durationDisplay.value).toBe('2 hours');
  });
});
