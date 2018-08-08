import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
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
export class CourseListComponent implements OnInit, OnDestroy {
  @Output() public deleteCourse = new EventEmitter();
  public courses: CourseInterface[] = [];
  private count = 5;
  private start = 1;
  public isLoadMore = false;

  private onDeleteSubscription: Subscription;
  private getListSubscription: Subscription;
  private onSearchSubscription: Subscription;

  constructor(private coursesService: CoursesService, private filterCourses: FilterPipe) { }

  public ngOnInit() {
    this.loadCourses();
  }

  public loadCourses(start = `${this.start}`, count = `${this.count}`) {
    this.onDeleteSubscription = this.coursesService.getList(start, count).subscribe((courses: CourseInterface[]) => {
      this.isLoadMore = !courses.length;
      this.courses = [...this.courses, ...courses];
    });
  }

  public onDelete(id: number) {
    this.getListSubscription = this.coursesService.onDelete(id).subscribe(() => {
      this.start = 0;
      this.courses = [];
      this.loadCourses();
    });
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
    this.start++;
    this.loadCourses();
  }

  ngOnDestroy() {
    if (this.onDeleteSubscription) {
      this.onDeleteSubscription.unsubscribe();
    }
    if (this.getListSubscription) {
      this.getListSubscription.unsubscribe();
    }
    if (this.onSearchSubscription) {
      this.onSearchSubscription.unsubscribe();
    }
  }
}
