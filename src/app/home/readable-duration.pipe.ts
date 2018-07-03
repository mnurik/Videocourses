import { Pipe, PipeTransform } from '@angular/core';
import * as humanize from 'humanize-duration';

@Pipe({
  name: 'readableDuration',
})
export class ReadableDurationPipe implements PipeTransform {

  transform(value: number): string {
    return humanize(value * 60 * 1000);
  }

}
