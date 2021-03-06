import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { EventEmitter } from 'events';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { CourseClass } from '../../shared/course-class';
import { ReadableDurationPipe } from '../readable-duration.pipe';
import { CourseItemComponent } from './course-item.component';

@Component({
  template: `
    <app-course-item
      [course]="course"
      (delete)="onDelete()"
    ></app-course-item>`,
})
class TestHostComponent {
  public course: CourseClass = new CourseClass(132, 'Test Course', 'Test Description', '12/12/2012', 120, []);
  public onDelete() { }
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
  let de;
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [CourseItemComponent, TestHostComponent, ReadableDurationPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert duration to more human readable time', () => {
    // get the name's input and display elements from the DOM
    const hostElement = fixture.nativeElement;
    const durationDisplay: HTMLElement = hostElement.querySelector('.course__time > span');
    const durationDisplayByCSS: HTMLElement = de.query(By.css('.course__time > span')).nativeElement;
    expect(durationDisplayByCSS.innerText).toBe('2 hours');
    expect(durationDisplay.textContent).toBe('2 hours');
    component.course =
      new CourseClass(133, 'Test Course New', 'Test Description New', '12/12/2012', 50, []);
    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();
    expect(durationDisplayByCSS.innerText).toBe('50 minutes');
    expect(durationDisplay.textContent).toBe('50 minutes');
  });

  it('should call onDelete method of container when delete button called', () => {
    spyOn(component, 'onDelete');
    const hostElement = fixture.nativeElement;
    const deleteButton: HTMLElement = hostElement.querySelector('.course__actions > button:nth-child(2)');
    expect(deleteButton.textContent).toBe('delete Remove');
    deleteButton.click();
    expect(window.confirm).toHaveBeenCalledWith('Do you really want to delete this course?');
    expect(component.onDelete).toHaveBeenCalled();
  });
});
