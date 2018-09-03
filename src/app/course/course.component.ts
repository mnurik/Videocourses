import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CourseInterface } from '../shared/course-interface';
import * as CourseActions from '../store/actions/courses.actions';
import { CoursesStateInterface } from '../store/reducers/courses.reducer';
import { AppState } from '../store/store.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit, OnDestroy {
  public course$;

  constructor(private route: ActivatedRoute, private router: Router, private store$: Store<AppState>) { }

  ngOnInit() {
    this.course$ = this.store$.pipe(
      select('courses'),
      map((coursesState: CoursesStateInterface) => coursesState.course),
    );
    this.store$.dispatch(new CourseActions.FetchCourseDataRequestAction(this.route.snapshot.paramMap.get('id')));
  }

  public get creationDate(): Observable<string> {
    return this.course$.pipe(
      map((course: CourseInterface) => moment(course.creationDate).format('YYYY-MM-DD')),
    );
  }

  public setCreationDate(course, value) {
    course.creationDate = new Date(value).getTime();
    // this.course$.next(this.course);
  }

  public get authors(): Observable<string> {
    return this.course$.pipe(
      map((course: CourseInterface) => {
        // this.course = course;
        return course.authors.map((author) => `${author.firstName} ${author.lastName}`).join();
      }),
    );
  }

  public authorsHandler(value: string) {
    const newAuthors = value.split(',').map((author) => {
      const [firstName, lastName] = author.trim().split(' ');
      return { firstName, lastName };
    });
    this.course$.pipe(
      map((course: CourseInterface) => {
        course.authors = newAuthors.map((newAuthor) => {
          const finded = course.authors
            .find((author) => author.firstName === newAuthor.firstName && author.lastName === newAuthor.lastName);
          if (finded) { return finded; } else { return newAuthor; }
        });
        return course;
      }),
    );
  }

  public update() {
    this.store$.dispatch(new CourseActions.CourseUpdateRequestAction(this.course$));
  }

  ngOnDestroy() {
    this.store$.dispatch(new CourseActions.CourseResetAction());
  }
}
