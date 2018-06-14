import { Component, OnInit } from '@angular/core';
import { CourseInterface } from '../course-interface';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class ListComponent implements OnInit {
  public courses: CourseInterface[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  onDelete(id: number) {
    this.courses = this.courses.filter(
      (course: CourseInterface) => course.id !== id,
    );
  }
}
