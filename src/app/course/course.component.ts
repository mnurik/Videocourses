import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CoursesService } from '../home/courses.service';
import { CourseInterface } from '../shared/course-interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  private course = {
    id: null,
    name: '',
    description: '',
    authors: [],
    creationDate: new Date().getTime(),
    duration: 0,
    liked: false,
    isTopRated: false,
  };
  public course$: BehaviorSubject<CourseInterface> = new BehaviorSubject(this.course);

  constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coursesService.getById(id).subscribe((course: CourseInterface) => {
        this.course$.next(Object.assign({}, this.course, course));
      });
    }
  }

  public get creationDate(): string {
    return moment(this.course.creationDate).format('YYYY-MM-DD');
  }

  public set creationDate(value: string) {
    this.course.creationDate = new Date(value).getTime();
    this.course$.next(this.course);
  }

  public get authors(): string {
    return this.course.authors.map((author) => `${author.firstName} ${author.lastName}`).join();
  }

  public authorsHandler(value: string) {
    const newAuthors = value.split(',').map((author) => {
      const [firstName, lastName] = author.trim().split(' ');
      return { firstName, lastName };
    });
    this.course.authors = newAuthors.map((newAuthor) => {
      const finded = this.course.authors
        .find((author) => author.firstName === newAuthor.firstName && author.lastName === newAuthor.lastName);
      if (finded) { return finded; } else { return newAuthor; }
    });
  }

  public update() {
    if (this.course.id === null) {
      this.coursesService.onCreate(this.course).subscribe(() => this.router.navigate(['/']));
    } else {
      this.coursesService.onUpdate(this.course).subscribe(() => this.router.navigate(['/']));
    }
  }
}
