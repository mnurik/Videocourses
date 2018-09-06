import { AbstractControl } from '@angular/forms';

export const NumberValidator = (control: AbstractControl): { [key: string]: any } | null =>
  /^[0-9]*$/g.test(control.value) ? null : { notNumber: { value: control.value } };
