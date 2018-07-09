import { Directive, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appStatus]',
})
export class StatusDirective {
  @Input() appStatus: number;
  creationDate: any = moment(this.appStatus);
  today: any = moment();
  before14Days: any = moment().subtract(14, 'days');

  constructor(el: ElementRef) {
    if (this.creationDate > this.today) {
      el.nativeElement.style.border = '2px solid blue';
    } else if (this.creationDate.diff(this.before14Days) < 14) {
      el.nativeElement.style.border = '2px solid green';
    }
  }

}
