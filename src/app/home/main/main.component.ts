import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { CourseInterface } from '../course-interface';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public courses: CourseInterface[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  onDelete(id: number) {
    this.courses = this.coursesService.onDelete(id);
  }

  onSearch(value: string) {
    this.courses = this.coursesService.onSearch(value);
  }
}
