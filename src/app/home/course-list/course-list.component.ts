import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';
import { CourseInterface } from '../../shared/course-interface';
import * as CoursesActions from '../../store/actions/courses.actions';
import { CoursesStateInterface } from '../../store/reducers/courses.reducer';
import { AppState } from '../../store/store.interface';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  @Output() public deleteCourse = new EventEmitter();
  public courses$: Observable<CourseInterface[]>;

  constructor(private store$: Store<AppState>) { }

  public ngOnInit() {
    this.loadCourses();
    this.courses$ = this.store$.pipe(
      select('courses'),
      map((courses: CoursesStateInterface) => courses.list),
    );
  }

  public loadCourses() {
    this.store$.dispatch(new CoursesActions.CoursesLoadRequestAction());
  }

  public onDelete(id: number) {
    this.store$.dispatch(new CoursesActions.CoursesDeleteRequestAction(id));
  }

  public onLike(id: number) {
    this.store$.dispatch(new CoursesActions.CourseLikeRequestAction(id));
  }

  public onSearch(value: string) {
    this.store$.dispatch(new CoursesActions.CoursesSearchRequestAction(value));
  }

  public loadMore() {
    this.store$.dispatch(new CoursesActions.CoursesPageAddAction());
    this.loadCourses();
  }
}
