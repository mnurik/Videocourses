import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolboxComponent implements OnInit {
  @Output() private searchCourse = new EventEmitter();
  public searchText = '';

  constructor() { }

  public ngOnInit() { }

  public search() {
    this.searchCourse.emit(this.searchText);
  }
}
