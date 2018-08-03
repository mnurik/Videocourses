import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CoursesService } from '../home/courses.service';
import { CourseInterface } from '../shared/course-interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  public course: CourseInterface = {
    id: null,
    title: '',
    description: '',
    authors: '',
    creationDate: new Date().getTime(),
    duration: 0,
    liked: false,
    topRated: false,
  };

  constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coursesService.getById(id).subscribe((course: CourseInterface) => {
        this.course = Object.assign({}, this.course, course);
      });
    }
  }

  public get creationDate() {
    return moment(this.course.creationDate).format('YYYY-MM-DD');
  }

  public set creationDate(value: string) {
    this.course.creationDate = new Date(value).getTime();
  }

  update() {
    if (this.course.id === null) {
      this.coursesService.onCreate(this.course).subscribe(() => this.router.navigate(['/']));
    } else {
      this.coursesService.onUpdate(this.course).subscribe(() => this.router.navigate(['/']));
    }
  }

}
