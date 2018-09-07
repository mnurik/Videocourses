import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorInterface } from '../shared/author-interface';
import { CourseInterface } from '../shared/course-interface';
import { NumberValidator } from '../shared/number-validator';
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
export class CourseComponent implements OnInit, OnDestroy {
  public course$: Observable<CourseInterface>;
  public availableAuthorList$: Observable<AuthorInterface[]>;
  public courseName = '';
  public courseForm: any;

  constructor(private route: ActivatedRoute, private store$: Store<AppState>, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      id: null,
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      authors: ['', Validators.required],
      duration: ['', [Validators.required, NumberValidator]],
      creationDate: [''],
    });
  }

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

    this.course$.subscribe((course: CourseInterface) => {
      const { liked, isTopRated, ...rest } = course;
      this.courseForm.setValue(rest);
    });

    this.courseForm.valueChanges.subscribe((course: CourseInterface) => {
      this.courseName = course.name;
    });
  }

  public update() {
    if (this.courseForm.dirty && this.courseForm.valid) {
      this.store$.dispatch(new CourseActions.CourseUpdateRequestAction(this.courseForm.value));
    }
  }

  ngOnDestroy() {
    this.store$.dispatch(new CourseActions.CourseResetAction());
  }
}
