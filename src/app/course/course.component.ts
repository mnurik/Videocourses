import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthorInterface } from '../shared/author-interface';
import { CourseInterface } from '../shared/course-interface';
import { AuthorsLoadRequestAction } from '../store/actions/authors.actions';
import * as CourseActions from '../store/actions/courses.actions';
import { CoursesStateInterface } from '../store/reducers/courses.reducer';
import { AppState } from '../store/store.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit, OnDestroy, OnChanges {
  public course$: Observable<CourseInterface>;
  public availableAuthorList$: Observable<AuthorInterface[]>;
  public courseName = '';
  public courseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    authors: new FormControl('', Validators.required),
  });

  constructor(private route: ActivatedRoute, private store$: Store<AppState>) { }

  ngOnInit() {
    this.course$ = this.store$.pipe(
      select('courses'),
      map((coursesState: CoursesStateInterface) => coursesState.course),
    );
    this.availableAuthorList$ = this.store$.pipe(
      select('authors'),
    );
    this.store$.dispatch(new CourseActions.FetchCourseDataRequestAction(this.route.snapshot.paramMap.get('id')));
    this.store$.dispatch(new AuthorsLoadRequestAction());
  }

  ngOnChanges() {
    this.course$.pipe(
      tap((course: CourseInterface) => {
        console.log(course);

        this.courseForm.setValue(course);
      }),
    );

    this.courseForm.valueChanges.pipe(
      tap((course: CourseInterface) => {
        this.courseName = course.name;
      }),
    );
  }

  public update() {
    this.store$.dispatch(new CourseActions.CourseUpdateRequestAction(this.courseForm.value));
  }

  ngOnDestroy() {
    this.store$.dispatch(new CourseActions.CourseResetAction());
  }
}
