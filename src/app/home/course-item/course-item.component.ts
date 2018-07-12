import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { CourseClass } from '../../shared/course-class';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public course: CourseClass;
  @Output() public delete = new EventEmitter();
  @Output() public like = new EventEmitter();

  constructor() {
  }

  public ngOnChanges() {
    console.log('%c>>ngOnChanges<<' + ' %clifecycle runs in CourseListComponent', 'color:red', 'color:black');
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    console.log(`>>Destroy<< ${this.course.id} course-item component`);
  }

}
