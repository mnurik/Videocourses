import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CourseInterface } from '../course-interface';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Output() deleteCourse = new EventEmitter();
  public courses: CourseInterface[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnChanges() {
    console.log('%c>>ngOnChanges<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }

  ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  ngDoCheck() {
    console.log('%c>>ngDoCheck<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  ngAfterContentInit() {
    console.log('%c>>ngAfterContentInit<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  ngAfterContentChecked() {
    console.log('%c>>ngAfterContentChecked<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  ngAfterViewInit() {
    console.log('%c>>ngAfterViewInit<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  ngAfterViewChecked() {
    console.log('%c>>ngAfterViewChecked<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }

  onDelete(id: number) {
    this.courses = this.coursesService.onDelete(id);
  }

  onSearch(value: string) {
    this.courses = this.coursesService.onSearch(value);
  }

  loadMore() {
    console.log('Load More clicked');
  }
}
