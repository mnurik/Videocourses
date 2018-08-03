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

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements
  OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Output() public deleteCourse = new EventEmitter();
  public courses: CourseInterface[] = [];
  private limit = 2;
  private page = 1;
  public isLoadMore = false;
  constructor(private coursesService: CoursesService, private filterCourses: FilterPipe) { }

  public ngOnInit() {
    this.loadCourses();
  }

  public loadCourses(page = `${this.page}`, limit = `${this.limit}`) {
    this.coursesService.getList(page, limit).subscribe((courses: CourseInterface[]) => {
      this.isLoadMore = !courses.length;
      this.courses = [...this.courses, ...courses];
    });
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
    this.coursesService.onDelete(id).subscribe(() => this.loadCourses());
  }

  public onLike(id: number) {
    this.coursesService.onLike(id);
  }

  public onSearch(value: string) {
    // this.courses = this.coursesService.onSearch(value);
    // this.courses = this.filterCourses.transform(this.coursesService.getList(), value);
  }

  public loadMore() {
    this.page++;
    this.loadCourses();
  }
}
