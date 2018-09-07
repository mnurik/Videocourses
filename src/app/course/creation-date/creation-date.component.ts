import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-creation-date',
  template: `
    <mat-form-field>
      <input matInput placeholder="Date" name="creationDate"
        (change)="onChange($event)"
        (keyup)="onChange($event)"
        [value]="creationDate"
        required >
      <mat-error *ngIf="!creationDate">Creation Date is <strong>required</strong></mat-error>
      <mat-error *ngIf="dateError">Date must be DD/MM/YYYY formatted.</mat-error>
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
  private data: any;
  private dateError = true;
  public creationDate = '';

  constructor() { }

  private propagateChange = (_: any) => { };

  public writeValue(obj: any) {
    if (obj) {
      this.data = obj;
      this.creationDate = obj;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  public validate(c: FormControl) {
    return this.dateError ? {
      dateError: {
        valid: false,
      },
    } : null;
  }

  public onChange(event) {
    const newValue = event.target.value;

    if (moment(newValue, 'DD/MM/YYYY', true).isValid()) {
      this.data = newValue;
      this.dateError = false;
    } else {
      this.dateError = true;
    }

    this.propagateChange(this.data);
  }
}
