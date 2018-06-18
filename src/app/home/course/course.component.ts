import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseInterface } from '../course-interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {

  @Input() course: CourseInterface;
  @Output() delete = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
