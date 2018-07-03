import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseClass } from '../course-class';
import { ReadableDurationPipe } from '../readable-duration.pipe';
import { CourseItemComponent } from './course-item.component';

@Component({
  template: `
    <app-course-item
      [course]="course"
    ></app-course-item>`,
})
class TestHostComponent {
  public course: CourseClass = new CourseClass(132, 'Test Course', 'Test Description', '01.01.2018', 120);
}

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
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, TestHostComponent, ReadableDurationPipe],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
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
