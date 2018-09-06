import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const NumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  /^[0-9]*$/g.test(control.value) ? null : { notNumber: { value: control.value } };
