import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseClass } from '../course-class';
import { CourseItemComponent } from './course-item.component';
import { ReadableDurationPipe } from '../readable-duration.pipe';

describe('CourseItemComponent as class', () => {
  let courseItemComponent: CourseItemComponent;
  beforeEach(() => {
    courseItemComponent = new CourseItemComponent();
  });

  it('should work', () => {
    expect(courseItemComponent).toBeTruthy();
  });
});

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  const expectedCourse: CourseClass = new CourseClass(132, 'Test Course', 'Test Description', '01.01.2018', 120);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, ReadableDurationPipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = expectedCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert hero name to Title Case', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const durationDisplay: HTMLElement = hostElement.querySelector('.course__time > span');
    expect(durationDisplay.textContent).toBe('2 hours');
    component.course = new CourseClass(133, 'Test Course New', 'Test Description New', '01.01.2019', 50);
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(durationDisplay.textContent).toBe('50 minutes');
  });
});
