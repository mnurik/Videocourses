import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appStatus]',
})
export class StatusDirective implements OnInit {
  @Input() appStatus: number;
  creationDate: any;
  today: any = moment();
  before14Days: any = moment().subtract(14, 'days');

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.creationDate = moment(this.appStatus);
    const duration = moment.duration(this.creationDate.diff(this.before14Days)).as('days');
    if (this.creationDate > this.today) {
      this.el.nativeElement.style.border = '2px solid blue';
    } else if (duration < 14 && duration > 0) {
      this.el.nativeElement.style.border = '2px solid green';
    }
  }

}
