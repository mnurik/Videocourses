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
import { CourseInterface } from '../../shared/course-interface';
import { CoursesService } from '../courses.service';
import { FilterPipe } from '../filter.pipe';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements
  OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Output() public deleteCourse = new EventEmitter();
  public courses$: Observable<CourseInterface[]>;
  public ngDoCheckChecker = false;
  constructor(private coursesService: CoursesService, private filterCourses: FilterPipe) { }

  public ngOnInit() {
    this.courses$ = this.coursesService.getList();
  }

  public ngDoCheck() {
    console.log('%c>>ngDoCheck<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
    this.ngDoCheckChecker = true;
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
    this.courses$ = this.coursesService.onDelete(id);
  }

  public onLike(id: number) {
    this.courses$ = this.coursesService.onLike(id);
  }

  public onSearch(value: string) {
    // this.courses = this.coursesService.onSearch(value);
    this.courses$ = this.filterCourses.transform(this.coursesService.getList(), value);
  }

  public loadMore() {
    console.log('Load More clicked');
  }
}
