import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appStatus]',
})
export class StatusDirective implements OnInit {
  @Input() private appStatus: number;
  private creationDate: moment.Moment;
  private today: moment.Moment = moment();
  private before14Days: moment.Moment = moment().subtract(14, 'days');
  private duration: number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.creationDate = moment(this.appStatus);
    this.duration = moment.duration(this.creationDate.diff(this.before14Days)).as('days');
    if (this.creationDate > this.today) {
      this.el.nativeElement.style.border = '2px solid blue';
    } else if (this.duration < 14 && this.duration > 0) {
      this.el.nativeElement.style.border = '2px solid green';
    }
  }

}
