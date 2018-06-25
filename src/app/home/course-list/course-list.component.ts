import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
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
  @Output() public deleteCourse = new EventEmitter();
  public courses: CourseInterface[] = [];

  constructor(private coursesService: CoursesService) { }

  public ngOnChanges() {
    console.log('%c>>ngOnChanges<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }

  public ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  public ngDoCheck() {
    console.log('%c>>ngDoCheck<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  public ngAfterContentInit() {
    console.log('%c>>ngAfterContentInit<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  public ngAfterContentChecked() {
    console.log('%c>>ngAfterContentChecked<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  public ngAfterViewInit() {
    console.log('%c>>ngAfterViewInit<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }
  public ngAfterViewChecked() {
    console.log('%c>>ngAfterViewChecked<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }

  public onDelete(id: number) {
    this.courses = this.coursesService.onDelete(id);
  }

  public onSearch(value: string) {
    this.courses = this.coursesService.onSearch(value);
  }

  public loadMore() {
    console.log('Load More clicked');
  }
}
