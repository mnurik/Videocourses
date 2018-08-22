import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolboxComponent implements OnInit {
  @Output() public searchCourse = new EventEmitter();
  public searchText$ = new BehaviorSubject('');

  constructor() { }

  public ngOnInit() {
    this.searchText$.pipe(
      filter((value) => value.length >= 3),
      debounceTime(600),
    ).subscribe((value) => this.searchCourse.emit(value));
  }

  public set searchText(value: string) {
    this.searchText$.next(value);
  }
}
