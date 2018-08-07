import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { CourseInterface } from '../../shared/course-interface';
import { CoursesService } from '../courses.service';
import { FilterPipe } from '../filter.pipe';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit, OnDestroy {
  @Output() public deleteCourse = new EventEmitter();
  public courses: CourseInterface[] = [];
  private limit = 2;
  private page = 1;
  public isLoadMore = false;

  private onDeleteSubscription: Subscription;
  private getListSubscription: Subscription;
  private onSearchSubscription: Subscription;

  constructor(private coursesService: CoursesService, private filterCourses: FilterPipe) { }

  public ngOnInit() {
    this.loadCourses();
  }

  public loadCourses(page = `${this.page}`, limit = `${this.limit}`) {
    this.onDeleteSubscription = this.coursesService.getList(page, limit).subscribe((courses: CourseInterface[]) => {
      this.isLoadMore = !courses.length;
      this.courses = [...this.courses, ...courses];
    });
  }

  public onDelete(id: number) {
    this.getListSubscription = this.coursesService.onDelete(id).subscribe(() => this.loadCourses());
  }

  public onLike(id: number) {
    this.coursesService.onLike(id);
  }

  public onSearch(value: string) {
    this.onSearchSubscription = this.coursesService.onSearch(value).subscribe((courses: CourseInterface[]) => {
      this.courses = courses;
    });
  }

  public loadMore() {
    this.page++;
    this.loadCourses();
  }

  ngOnDestroy() {
    this.onDeleteSubscription.unsubscribe();
    this.getListSubscription.unsubscribe();
    this.onSearchSubscription.unsubscribe();
  }
}
