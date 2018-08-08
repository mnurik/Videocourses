import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseClass } from '../../shared/course-class';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit {

  @Input() public course: CourseClass;
  @Output() public delete = new EventEmitter();
  @Output() public like = new EventEmitter();

  constructor() {
  }

  public ngOnInit() {
  }

  public onDelete() {
    if (window.confirm('Do you really want to delete this course?')) {
      this.delete.emit();
    }
  }

}
