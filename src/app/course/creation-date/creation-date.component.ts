import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-creation-date',
  template: `
    <mat-form-field>
      <input
        matInput
        placeholder="Date"
        name="creationDate"
        (change)="onChange($event)"
        (keyup)="onChange($event)"
        [value]="value"
        [formControl]="formControl"
      >
      <mat-error *ngIf="formControl.hasError('requiredError') && formControl.touched">
        Creation Date is <strong>required</strong>
      </mat-error>
      <mat-error *ngIf="formControl.hasError('dateError') && formControl.touched">
        Date must be DD/MM/YYYY formatted.
      </mat-error>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 92%;
      }

      mat-form-field {
        margin: 20px;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreationDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CreationDateComponent),
      multi: true,
    },
  ],
})
export class CreationDateComponent implements ControlValueAccessor, Validator {
  private FORMAT = 'DD/MM/YYYY';
  private dateError = false;
  private requiredError = false;

  @Input() public formControl: FormControl;

  public value: string;

  private propagateChange;

  public writeValue(value: string) {
    this.checkValue(value);
  }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn) {
    this.propagateChange = fn;
  }

  public validate(): ValidationErrors | null {
    const errors = {};
    if (this.requiredError) {
      errors['requiredError'] = { valid: false };
    }
    if (this.dateError) {
      errors['dateError'] = { valid: false };
    }

    return Object.keys(errors).length ? errors : null;
  }

  private checkValue(value: string) {
    this.requiredError = false;
    this.dateError = false;

    if (!value || value.length < 10) {
      this.requiredError = true;
      return;
    }

    let momentValue = moment(value);
    if (momentValue.isValid()) {
      this.setValue(momentValue);
      return;
    }

    momentValue = moment(value, this.FORMAT, true);
    if (momentValue.isValid()) {
      this.setValue(momentValue);
      return;
    }

    this.dateError = true;
  }

  private setValue(momentValue: moment.Moment) {
    this.value = momentValue.format(this.FORMAT);
  }

  public onChange(event) {
    this.checkValue(event.target.value);
    this.formControl.updateValueAndValidity();
    this.propagateChange();
  }
}
