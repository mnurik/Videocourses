import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../home/courses.service';
import { CourseInterface } from '../shared/course-interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.course = Object.assign({}, this.course, this.coursesService.getById(this.route.snapshot.paramMap.get('id')));
  }

  update() {
    if (this.course.id) {
      this.coursesService.onUpdate(this.course);
    } else {
      this.coursesService.onCreate(this.course);
    }
    this.router.navigate(['/']);
  }

}
