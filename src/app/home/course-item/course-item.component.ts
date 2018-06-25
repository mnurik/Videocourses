import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CourseClass } from '../course-class';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit, OnDestroy {

  @Input() public course: CourseClass;
  @Output() public delete = new EventEmitter();

  constructor() {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    console.log(`>>Destroy<< ${this.course.id} course-item component`);
  }

}
