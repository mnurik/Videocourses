import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../home/courses.service';
import { CourseInterface } from '../shared/course-interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  public course: CourseInterface;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.course = this.coursesService.getById(this.route.snapshot.paramMap.get('id'));
  }

}
