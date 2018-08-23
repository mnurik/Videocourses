import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolboxComponent implements OnInit, OnDestroy {
  @Output() public searchCourse = new EventEmitter();
  public searchText$ = new BehaviorSubject('');
  // TODO destroy unsubscribe

  private onDestroy$ = new Subject();

  constructor() { }

  public ngOnInit() {
    this.searchText$.pipe(
      filter((value) => value.length >= 3),
      debounceTime(600),
      takeUntil(this.onDestroy$),
    ).subscribe((value) => this.searchCourse.emit(value));
  }

  public set searchText(value: string) {
    this.searchText$.next(value);
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
  }
}
