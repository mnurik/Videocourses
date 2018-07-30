import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CoursesService } from '../home/courses.service';
import { LoginComponent } from '../login/login.component';
import { CourseInterface } from '../shared/course-interface';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let getByIdSpy;
  let coursesService;
  let de;
  const fakeCourse: Partial<CourseInterface> = {
    title: 'test',
    creationDate: 1514764800000,
  };

  beforeEach(async(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['getById', 'onCreate', 'onUpdate']);
    getByIdSpy = coursesService.getById.and.returnValue(fakeCourse);
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
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service method getById inside ngOnInit', () => {
    expect(getByIdSpy.calls.count()).toBe(1);
    expect(component.course.title).toBe('test');
    expect(component.course.creationDate).toBe(1514764800000);
  });

  it('title input should have value', () => {
    fixture.whenStable().then(() => {
      const hostElement = fixture.nativeElement;
      const inputEl: HTMLInputElement = hostElement.querySelector('input[name="title"]');
      const inputElByCSS: HTMLInputElement = de.query(By.css('input[name="title"]')).nativeElement;
      expect(inputEl.value).toBe('test');
      expect(inputElByCSS.value).toBe('test');

      inputEl.value = 'test 2';
      inputEl.dispatchEvent(new Event('input'));

      expect(component.course.title).toBe('test 2');
    });
  });

  it('title input should have value', () => {
    fixture.whenStable().then(() => {
      const hostElement = fixture.nativeElement;
      const inputEl: HTMLInputElement = hostElement.querySelector('input[name="creationDate"]');
      const inputElByCSS: HTMLInputElement = de.query(By.css('input[name="creationDate"]')).nativeElement;
      expect(inputEl.value).toBe('2018-01-01');
      expect(inputElByCSS.value).toBe('2018-01-01');

      inputEl.value = '2019-01-01';
      inputEl.dispatchEvent(new Event('input'));

      expect(component.course.creationDate).toBe(1546300800000);
    });
  });

  it('should call create service if id not exist, otherwise update', () => {
    const hostElement = fixture.nativeElement;
    const submitButton: HTMLInputElement = hostElement.querySelector('button[type="submit"]');
    submitButton.dispatchEvent(new Event('click'));
    expect(coursesService.onCreate.calls.count()).toBe(1);

    component.course.id = 1;
    submitButton.dispatchEvent(new Event('click'));
    expect(coursesService.onUpdate.calls.count()).toBe(1);
  });
});
