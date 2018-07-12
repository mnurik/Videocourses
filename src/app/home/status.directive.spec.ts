import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { StatusDirective } from './status.directive';

@Component({
  template: `
    <div [appStatus]="yesterdayCreated"></div>
    <div [appStatus]="tomorrowWillBeCreated"></div>
    <div [appStatus]="oneYearAgoCreated"></div>
    <div appStatus></div>
  `,
})
class TestComponent {
  yesterdayCreated = new Date(moment().subtract(1, 'days').format()).getTime();
  tomorrowWillBeCreated = new Date(moment().add(1, 'days').format()).getTime();
  oneYearAgoCreated = new Date(moment().subtract(1, 'year').format()).getTime();
}

describe('StatusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [StatusDirective, TestComponent],
    })
      .createComponent(TestComponent);

    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(StatusDirective));
  });

  it('should create an instance', () => {
    expect(des.length).toBe(4);
  });

  it('should add colored border "green"', () => {
    const border = des[0].nativeElement.style.border;
    expect(border).toBe('2px solid green');
  });

  it('should add colored border "blue"', () => {
    const border = des[1].nativeElement.style.border;
    expect(border).toBe('2px solid blue');
  });

  it('should not add border', () => {
    const border = des[2].nativeElement.style.border;
    expect(border).toBe('');
  });

  it('should not add border', () => {
    const border = des[3].nativeElement.style.border;
    expect(border).toBe('');
  });
});
