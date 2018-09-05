import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolboxComponent implements OnInit, OnDestroy {
  @Output() public searchCourse = new EventEmitter();
  private onDestroy$ = new Subject();
  public search = new FormControl('', Validators.minLength(3));

  constructor() { }

  public ngOnInit() {
    this.search.valueChanges.pipe(
      filter((value) => value.length >= 3 || !value.length),
      debounceTime(600),
      takeUntil(this.onDestroy$),
    ).subscribe((value) => this.searchCourse.emit(value));
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
  }
}
